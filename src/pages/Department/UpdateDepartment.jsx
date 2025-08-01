import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentById, updateDepartment } from "../../features/departmentSlice";
import { fetchCompanies } from "../../features/companySlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateDepartment() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token);
    const { companies } = useSelector((state) => state.company);
    const { selectedDepartment, loading } = useSelector((state) => state.department);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        companyId: "",
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        dispatch(fetchCompanies(token));
        dispatch(getDepartmentById(id));
    }, [dispatch, id, token]);

    useEffect(() => {
        if (selectedDepartment) {
            setFormData({
                name: selectedDepartment.name || "",
                description: selectedDepartment.description || "",
                companyId: selectedDepartment.company?.companyId || "",
            });
        }
    }, [selectedDepartment]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            toast.error("Please fix the errors in the form.");
            return;
        }

        try {
            await dispatch(updateDepartment({
                departmentId: id,
                departmentData: formData,
                token,
            })).unwrap();
            toast.success("Department updated successfully!");
            navigate("/dashboard/department");
        } catch (err) {
            toast.error("Failed to update department.");
        }
    };

    return (
        <div className="w-full px-4 md:px-8 py-6">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 md:p-8 shadow-xl text-gray-800 max-w-xl mx-auto">
                <h2 className="text-xl font-bold mb-4 text-indigo-900 tracking-widest uppercase">
                    Edit Department
                </h2>

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
                            className={`w-full px-4 py-2 rounded-lg border ${formErrors.name ? "border-red-500" : "border-gray-300"} bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
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
                            className={`w-full px-4 py-2 rounded-lg border ${formErrors.companyId ? "border-red-500" : "border-gray-300"} bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        >
                            <option value="">Select a company</option>
                            {companies.map((company) => (
                                <option key={company.companyId} value={company.companyId}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                        {formErrors.companyId && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.companyId}</p>
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
                            {loading ? "Updating..." : "Update Department"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
