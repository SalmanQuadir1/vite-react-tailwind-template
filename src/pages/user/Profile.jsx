// src/pages/Profile.jsx
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiCalendar, FiEdit2, FiShield, FiUser } from "react-icons/fi";

export default function Profile() {
    const user = useSelector((state) => state.auth.user);

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center "
            style={{
                background: "linear-gradient(135deg, #f7e8ff 0%, #e0f7fa 100%)",
            }}
        >
            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
                {/* Left: Profile Card */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/50 shadow-xl flex flex-col items-center p-10 w-full md:w-1/2 transition-all duration-300">
                    <div className="mb-4">
                        <div className="w-28 h-28 bg-indigo-400 rounded-full flex items-center justify-center text-6xl font-extrabold uppercase shadow-xl border-4 border-white/40 text-white select-none">
                            {user?.name?.charAt(0) || user?.username?.charAt(0) || "U"}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-1 tracking-wide text-gray-800">
                            {user?.username || "User"}
                        </h2>
                        <span className="inline-flex items-center px-4 py-1 mt-1 rounded-full bg-indigo-500/90 text-xs uppercase text-indigo-100 shadow font-bold">
                            <FiShield className="mr-1" />
                            {user?.role || "Employee"}
                        </span>
                    </div>
                    <div className="w-full mt-6">
                        <Link
                            to="/profile/edit"
                            className="w-full flex justify-center items-center gap-2 py-2 mt-2 rounded-xl border border-indigo-400 text-indigo-600 hover:bg-indigo-500/80 hover:text-white transition text-center text-sm font-medium shadow"
                        >
                            <FiEdit2 /> Edit Profile
                        </Link>
                        <Link
                            to="/change-password"
                            className="w-full flex justify-center items-center gap-2 py-2 mt-2 rounded-xl border border-purple-400 text-purple-600 hover:bg-purple-500/80 hover:text-white transition text-center text-sm font-medium shadow"
                        >
                            <FiShield /> Change Password
                        </Link>
                    </div>
                </div>
                {/* Right: Info Fields */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl w-full md:w-1/2 flex flex-col justify-center p-10 transition-all duration-300">
                    <div className="space-y-8">
                        <ProfileField
                            icon={<FiUser className="text-indigo-400 text-xl" />}
                            label="Username"
                            value={user?.username || "N/A"}
                        />
                        <ProfileField
                            icon={<FiMail className="text-indigo-400 text-xl" />}
                            label="Email"
                            value={user?.email || "Not specified"}
                        />
                        <ProfileField
                            icon={<FiPhone className="text-indigo-400 text-xl" />}
                            label="Phone"
                            value={user?.company?.phone || "Not specified"}
                        />
                        <ProfileField
                            icon={<FiCalendar className="text-indigo-400 text-xl" />}
                            label="Join Date"
                            value={user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
function ProfileField({ icon, label, value }) {
    return (
        <div className="flex items-center gap-4">
            <div>{icon}</div>
            <div>
                <div className="text-xs text-gray-500">{label}</div>
                <div className="text-base font-medium text-gray-800">{value}</div>
            </div>
        </div>
    );
}
