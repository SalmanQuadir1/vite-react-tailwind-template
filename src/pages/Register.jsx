import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        fullName: "",
        phone: "",
        designation: "",
        department: "",
        dateOfJoining: "",
        companyId: ""
    });

    const [companies, setCompanies] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch companies from backend
        axios.get("http://localhost:8080/api/companies")
            .then(res => setCompanies(res.data))
            .catch(err => console.error("Failed to load companies", err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await axios.post("http://localhost:8080/api/auth/register", form);
            setMessage("✅ " + res.data);
            setTimeout(() => navigate("/login"), 1000);
        } catch (err) {
            setMessage("❌ " + (err.response?.data || "Registration failed"));
        }
    };

    const inputClass =
        "w-full px-4 py-3 bg-white/80 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 text-sm transition-all";

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 font-inter">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white/30 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">

                {/* Left Visual */}
                <div className="relative hidden lg:flex flex-col justify-center bg-cover bg-center text-white p-12"
                    style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80)" }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-800/80 backdrop-blur-sm"></div>
                    <div className="relative z-10 text-center space-y-4">
                        <h1 className="text-5xl font-bold tracking-[1rem]">HRMS</h1>
                        <p className="text-lg font-medium">
                            Streamline employee management with a modern HR platform.
                        </p>
                    </div>
                </div>

                {/* Right Form */}
                <div className="flex items-center justify-center p-6 sm:p-10 bg-white/70 backdrop-blur-lg">
                    <div className="w-full max-w-md space-y-8">
                        <h2 className="text-4xl font-extrabold text-center text-gray-900 tracking-tight">
                            Register
                        </h2>
                        <p className="text-center text-gray-500 text-base -mt-4">
                            Create your HRMS account
                        </p>

                        {message && (
                            <div className={`text-sm text-center font-medium p-4 rounded-xl ${message.includes("✅")
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                                }`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                    <input type="text" name="designation" value={form.designation} onChange={handleChange} required className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <input type="text" name="department" value={form.department} onChange={handleChange} required className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
                                    <input type="date" name="dateOfJoining" value={form.dateOfJoining} onChange={handleChange} required className={inputClass} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <input type="text" name="username" value={form.username} onChange={handleChange} required className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input type="password" name="password" value={form.password} onChange={handleChange} required className={inputClass} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                <select name="companyId" value={form.companyId} onChange={handleChange} className={inputClass}>
                                    <option value="">-- Select Company --</option>
                                    {companies.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
                            >
                                Register
                            </button>
                        </form>

                        <p className="mt-6 text-sm text-center text-gray-600 font-medium">
                            Already have an account?{" "}
                            <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
