import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById, updateEmployee } from "../../features/employeeSlice";
import { fetchDepartments } from "../../features/departmentSlice";
import { fetchCompanies } from "../../features/companySlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateEmployee() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { selectedEmployee, loading, error } = useSelector((state) => state.employee);
    const { departments } = useSelector((state) => state.department);
    const { companies } = useSelector((state) => state.company);

    const [formData, setFormData] = useState({
        companyId: "",
        fullName: "",
        phone: "",
        gender: "",
        dob: "",
        address: "",
        designation: "",
        departmentId: "",
        joiningDate: "",
        status: "Active",
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        dispatch(fetchDepartments());
        dispatch(fetchCompanies());
        dispatch(getEmployeeById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedEmployee) {
            // Map existing employee data into form fields
            setFormData({
                companyId: selectedEmployee.company?.companyId || "",
                departmentId: selectedEmployee.department?.departmentId || "",
                fullName: selectedEmployee.fullName || "",
                phone: selectedEmployee.phone || "",
                gender: selectedEmployee.gender || "",
                dob: selectedEmployee.dob || "",
                address: selectedEmployee.address || "",
                designation: selectedEmployee.designation || "",
                joiningDate: selectedEmployee.joiningDate || "",
                status: selectedEmployee.status || "Active",
            });
        }
    }, [selectedEmployee]);

    const validate = () => {
        const errors = {};
        if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
        if (!/^[0-9]{10}$/.test(formData.phone)) errors.phone = "Phone must be 10 digits.";
        if (!formData.gender) errors.gender = "Gender is required.";
        if (!formData.dob) errors.dob = "Date of birth is required.";
        if (!formData.joiningDate) errors.joiningDate = "Joining date is required.";
        if (!formData.designation.trim()) errors.designation = "Designation is required.";
        if (!formData.companyId) errors.companyId = "Company is required.";
        if (!formData.departmentId) errors.departmentId = "Department is required.";
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

        const result = await dispatch(updateEmployee({ id, employee: formData }));
        if (updateEmployee.fulfilled.match(result)) {
            toast.success("Employee updated successfully!");
            navigate("/dashboard/employee/view");
        } else {
            toast.error("Failed to update employee.");
        }
    };

    return (
        <div className="w-full px-4 md:px-8 py-6">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 md:p-8 shadow-xl text-gray-800">
                <h2 className="text-xl font-bold mb-4 text-indigo-900 tracking-widest uppercase">
                    Update Employee
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Company */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Company</label>
                        <select
                            name="companyId"
                            value={formData.companyId}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${formErrors.companyId ? "border-red-500" : "border-gray-300"} bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        >
                            <option value="">-- Select Company --</option>
                            {companies.map((c) => (
                                <option key={c.companyId} value={c.companyId}>{c.name}</option>
                            ))}
                        </select>
                        {formErrors.companyId && <p className="text-red-500 text-xs mt-1">{formErrors.companyId}</p>}
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Department</label>
                        <select
                            name="departmentId"
                            value={formData.departmentId}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${formErrors.departmentId ? "border-red-500" : "border-gray-300"} bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        >
                            <option value="">-- Select Department --</option>
                            {departments.map((d) => (
                                <option key={d.departmentId} value={d.departmentId}>{d.name}</option>
                            ))}
                        </select>
                        {formErrors.departmentId && <p className="text-red-500 text-xs mt-1">{formErrors.departmentId}</p>}
                    </div>

                    {/* Other fields */}
                    {[
                        { name: "fullName", label: "Full Name" },
                        { name: "phone", label: "Phone" },
                        { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
                        { name: "dob", label: "Date of Birth", type: "date" },
                        { name: "address", label: "Address" },
                        { name: "designation", label: "Designation" },
                        { name: "joiningDate", label: "Date of Joining", type: "date" },
                        { name: "status", label: "Status", type: "select", options: ["Active", "Inactive", "Terminated"] }
                    ].map(({ name, label, type = "text", options }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
                            {type === "select" ? (
                                <select
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">-- Select --</option>
                                    {options.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name] || ""}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${formErrors[name] ? "border-red-500" : "border-gray-300"} bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                />
                            )}
                            {formErrors[name] && (
                                <p className="text-red-500 text-xs mt-1">{formErrors[name]}</p>
                            )}
                        </div>
                    ))}

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all duration-300"
                        >
                            {loading ? "Updating..." : "Update Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
