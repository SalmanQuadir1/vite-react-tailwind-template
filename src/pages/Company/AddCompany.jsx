/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "../../features/companySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddCompany() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { companies, loading, error } = useSelector((state) => state.company);
    console.log(companies)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        industryType: "",
        status: "Active",
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (error) {
            toast.error(`Error: ${error}`);
        }
    }, [error]);

    const validate = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Company name is required.";
        if (!formData.address.trim()) errors.address = "Address is required.";
        if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email address.";
        if (!/^[0-9]{10}$/.test(formData.phone)) errors.phone = "Phone must be 10 digits.";
        if (!formData.industryType.trim()) errors.industryType = "Industry type is required.";
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
            const result = await dispatch(createCompany(formData)).unwrap();
            toast.success("Company created successfully!");
            navigate("/dashboard/company/view");
        } catch (err) {
            toast.error(`Failed to create company: ${err}`);
        }
    };

    return (
        <div className="w-full px-4 md:px-8 py-6">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 md:p-8 shadow-xl text-gray-800">
                <h2 className="text-xl font-bold mb-4 text-indigo-900 tracking-widest uppercase">
                    Add Company
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Company Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${formErrors.name ? "border-red-500" : "border-gray-300"} bg-white/90 text-gray-800`}
                        />
                        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${formErrors.email ? "border-red-500" : "border-gray-300"} bg-white/90 text-gray-800`}
                        />
                        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${formErrors.phone ? "border-red-500" : "border-gray-300"} bg-white/90 text-gray-800`}
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${formErrors.address ? "border-red-500" : "border-gray-300"} bg-white/90 text-gray-800`}
                        />
                        {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                    </div>

                    {/* Industry Type */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Industry Type</label>
                        <input
                            type="text"
                            name="industryType"
                            value={formData.industryType}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${formErrors.industryType ? "border-red-500" : "border-gray-300"} bg-white/90 text-gray-800`}
                        />
                        {formErrors.industryType && <p className="text-red-500 text-xs mt-1">{formErrors.industryType}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/90 text-gray-800"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all duration-300"
                        >
                            {loading ? "Saving..." : "Create Company"}
                        </button>
                    </div>
                </form>
            </div>






            <div className="overflow-x-auto bg-white/20 backdrop-blur-md border border-white rounded-2xl p-6 md:p-8 shadow-xl text-gray-800">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="bg-white/30 text-gray-900">
                            <th scope="col" className="py-3 px-4 text-left font-semibold">Company Name</th>
                            <th scope="col" className="py-3 px-4 text-left font-semibold">Email</th>
                            <th scope="col" className="py-3 px-4 text-left font-semibold">Type</th>
                            <th scope="col" className="py-3 px-4 text-left font-semibold">Phone</th>
                            <th scope="col" className="py-3 px-4 text-left font-semibold">Address</th>
                            <th scope="col" className="py-3 px-4 text-center font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies && companies.map(company => (
                            <tr
                                key={company.companyId}
                                className="bg-white/10 hover:bg-white/20 transition-colors duration-200 border-b border-white/20"
                            >
                                <td className="py-3 px-4">{company.name}</td>
                                <td className="py-3 px-4">{company.email}</td>
                                <td className="py-3 px-4">{company.industryType}</td>
                                <td className="py-3 px-4">{company.phone}</td>
                                <td className="py-3 px-4">{company.address}</td>
                                <td className="py-3 px-4 text-center space-x-2">
                                    {/* Example action buttons */}
                                    <button
                                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                        aria-label={`Edit ${company.name}`}
                                    //onClick={() => handleEdit(company.companyId)}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700 focus:outline-none"
                                        aria-label={`Delete ${company.name}`}
                                    //   onClick={() => handleDelete(company.companyId)}
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    );
}
