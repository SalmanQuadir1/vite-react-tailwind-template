import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createDepartment,
    deleteDepartment,
    fetchDepartments,
    getDepartmentById,
} from "../../features/departmentSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCompanies } from "../../features/companySlice";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Department() {
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();

    const { departments, loading, error } = useSelector(
        (state) => state.department
    );
    const { companies } = useSelector(
        (state) => state.company
    );
    const token = useSelector((state) => state.auth.token);

    // const [companies, setCompanies] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        companyId: "",
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        dispatch(fetchDepartments(token));
        dispatch(fetchCompanies(token));

    }, [dispatch, token]);

    const validate = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Department name is required.";
        if (!formData.companyId) errors.companyId = "Company is required.";
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            try {
                await dispatch(deleteDepartment(id)).unwrap();
                dispatch(fetchDepartments(token));
                alert("Department deleted successfully.");

            } catch (err) {
                alert(`Failed to delete department: ${err}`);
            }
        }
    };

    const handleEdit = async (departmentId) => {
        try {
            await dispatch(getDepartmentById(departmentId)).unwrap();
            console.log(departmentId)
            navigate(`/dashboard/department/edit/${departmentId}`);
        } catch (err) {
            alert(`Failed to fetch department details: ${err}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            toast.error("Please fix the errors in the form.");
            return;
        }

        const result = await dispatch(
            createDepartment({
                departmentData: formData,
                token,
            })

        );


        if (createDepartment.fulfilled.match(result)) {
            toast.success("Department created successfully!");
            setFormData({ name: "", description: "", companyId: "" });
            dispatch(fetchDepartments(token));
        } else {
            toast.error(result.payload || "Failed to create department.");
        }
    };


    return (
        <div className="w-full px-4 md:px-8 py-6 space-y-10">
            {/* Form */}
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 md:p-8 shadow-xl text-gray-800">
                <h2 className="text-xl font-bold mb-4 text-indigo-900 tracking-widest uppercase">
                    Add Department
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    {/* Department Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${formErrors.name ? "border-red-500" : "border-gray-300"
                                } bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        />
                        {formErrors.name && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                        )}
                    </div>

                    {/* Company Select */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Company
                        </label>
                        <select
                            name="companyId"
                            value={formData.companyId}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${formErrors.companyId ? "border-red-500" : "border-gray-300"
                                } bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        >
                            <option value="">Select a company</option>
                            {companies && companies.map((company) => (
                                <option key={company.companyId} value={company.companyId} >
                                    {company.name}
                                </option>
                            ))}
                        </select>
                        {formErrors.companyId && (
                            <p className="text-red-500 text-xs mt-1">
                                {formErrors.companyId}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Description (optional)
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all duration-300"
                        >
                            {loading ? "Saving..." : "Create Department"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Department Cards */}


            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 md:p-8 shadow-xl text-gray-800 mt-10">
                <h3 className="text-lg font-semibold mb-6 text-indigo-800 tracking-widest uppercase">
                    Existing Departments
                </h3>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse rounded-xl overflow-hidden shadow-md">
                        <thead className="bg-indigo-100 text-indigo-800 text-left text-sm uppercase tracking-wider">
                            <tr>
                                <th className="py-3 px-4 border-b">Name</th>
                                <th className="py-3 px-4 border-b">Description</th>
                                <th className="py-3 px-4 border-b">Company</th>
                                <th className="py-3 px-4 border-b text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-700">
                            {departments.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500 italic">
                                        No departments available.
                                    </td>
                                </tr>
                            ) : (
                                departments.map((dept) => (
                                    <tr
                                        key={dept.departmentId}
                                        className="hover:bg-indigo-50 transition-all"
                                    >
                                        <td className="py-3 px-4 border-b font-medium">{dept.name}</td>
                                        <td className="py-3 px-4 border-b">
                                            {dept.description || "No description"}
                                        </td>
                                        <td className="py-3 px-4 border-b">
                                            {dept.company?.name || "N/A"}
                                        </td>
                                        <td className="py-3 px-4 border-b text-center">
                                            <div className="flex items-center justify-center gap-4">
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-800 transition"
                                                    onClick={() => handleEdit(dept.departmentId)}
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-800 transition"
                                                    onClick={() => handleDelete(dept.departmentId)}
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
}
