import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form));
    };

    useEffect(() => {
        if (token) navigate("/dashboard");
    }, [token, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center font-inter">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 w-full max-w-md shadow-xl relative text-white">
                <h2 className="text-3xl font-bold text-center tracking-[0.7rem] mb-2">ASTE HRMS</h2>
                <p className="text-sm text-center text-gray-300 mb-6">Sign in to your HRMS dashboard</p>

                {error && (
                    <p className="bg-red-200 text-red-800 text-sm p-3 rounded-lg mb-4 text-center">
                        {error}
                    </p>
                )}
                {loading && (
                    <p className="text-sm text-center text-indigo-200 mb-4">Logging in...</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                                placeholder="Enter username"
                                className="w-full px-10 py-3 rounded-xl bg-white/80 text-gray-900 placeholder-gray-400 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <FiUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full px-10 py-3 rounded-xl bg-white/80 text-gray-900 placeholder-gray-400 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all duration-300"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-300">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-white underline hover:text-indigo-300 transition">
                        Register now
                    </a>
                </p>
            </div>
        </div>
    );
}
