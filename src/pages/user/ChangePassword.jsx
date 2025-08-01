import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiLock } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.warning("New password and confirmation do not match.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:8080/api/auth/change-password",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            toast.success(res.data || "Password changed successfully.");
            setTimeout(() => {
                dispatch(logout());
                navigate("/login");
            }, 1500);
            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

        } catch (error) {
            toast.error(
                error.response?.data || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center font-inter">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 w-full max-w-md shadow-xl relative text-white">
                <h2 className="text-3xl font-bold text-center tracking-[0.7rem] mb-2">
                    ASTE HRMS
                </h2>
                <p className="text-sm text-center text-gray-300 mb-6">
                    Change your account password
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Old Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                required
                                placeholder="Enter current password"
                                className="w-full px-10 py-3 rounded-xl bg-white/80 text-gray-900 placeholder-gray-400 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                placeholder="Enter new password"
                                className="w-full px-10 py-3 rounded-xl bg-white/80 text-gray-900 placeholder-gray-400 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Re-enter new password"
                                className="w-full px-10 py-3 rounded-xl bg-white/80 text-gray-900 placeholder-gray-400 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all duration-300"
                    >
                        {loading ? "Changing..." : "Change Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
