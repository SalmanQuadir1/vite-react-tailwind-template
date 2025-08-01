import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
    FiLogOut,
    FiHome,
    FiUser,
    FiUsers,
    FiSettings,
    FiChevronDown,
    FiCalendar,
    FiKey,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { BiMenuAltRight } from "react-icons/bi";
import { logout } from "../features/authSlice";

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [authCheckComplete, setAuthCheckComplete] = useState(false);
    const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
    const [configuratorDropdownOpen, setConfiguratorDropdownOpen] = useState(false);
    const [attendanceDropdownOpen, setAttendanceDropdownOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login", { replace: true });
        } else {
            setAuthCheckComplete(true);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/login", { replace: true });
    };

    const isActive = (path) => location.pathname.startsWith(path);

    const toggleDropdown = (menu) => {
        setEmployeeDropdownOpen(menu === 'employee' ? !employeeDropdownOpen : false);
        setConfiguratorDropdownOpen(menu === 'configurator' ? !configuratorDropdownOpen : false);
        setAttendanceDropdownOpen(menu === 'attendance' ? !attendanceDropdownOpen : false);
    };

    if (!authCheckComplete) return null;

    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-800 font-inter">
            {/* Sidebar */}
            <aside className={`fixed z-30 top-0 left-0 h-full w-64 bg-black text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-20 text-2xl font-bold tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600">
                        <span className="text-white tracking-wide">Hrms</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 text-sm">
                        <SidebarLink to="/dashboard" icon={<FiHome />} label="Dashboard" active={isActive("/dashboard")} />

                        {/* Employees Dropdown */}
                        <div className="space-y-1">
                            <button
                                onClick={() => toggleDropdown('employee')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 hover:bg-purple-600/70 ${isActive("/dashboard/employee") ? "bg-purple-700/80 font-semibold" : "text-gray-300 hover:text-white"}`}
                            >
                                <span className="mr-3"><FiUsers /></span>
                                <span className="flex-1 text-left">Employees</span>
                                <FiChevronDown className={`transition-transform ${employeeDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {employeeDropdownOpen && (
                                <div className="ml-8 space-y-1">
                                    <SidebarLink to="/dashboard/employee/add" icon="➕" label="Add Employee" active={isActive("/dashboard/employee/add")} />
                                    <SidebarLink to="/dashboard/employee/view" icon="📄" label="View Employees" active={isActive("/dashboard/employee/view")} />
                                </div>
                            )}
                        </div>

                        {/* Configurator Dropdown */}
                        <div className="space-y-1">
                            <button
                                onClick={() => toggleDropdown('configurator')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 hover:bg-purple-600/70 ${isActive("/dashboard/configurator") ? "bg-purple-700/80 font-semibold" : "text-gray-300 hover:text-white"}`}
                            >
                                <span className="mr-3"><FiSettings /></span>
                                <span className="flex-1 text-left">Configurator</span>
                                <FiChevronDown className={`transition-transform ${configuratorDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {configuratorDropdownOpen && (
                                <div className="ml-8 space-y-1">
                                    <SidebarLink to="/dashboard/company/add" icon="🏢" label="Add Company" active={isActive("/dashboard/configurator/add-company")} />
                                    <SidebarLink to="/dashboard/department/add" icon="🏬" label="Add Department" active={isActive("/dashboard/configurator/add-department")} />
                                </div>
                            )}
                        </div>

                        {/* Attendance Dropdown */}
                        <div className="space-y-1">
                            <button
                                onClick={() => toggleDropdown('attendance')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 hover:bg-purple-600/70 ${isActive("/dashboard/attendance") ? "bg-purple-700/80 font-semibold" : "text-gray-300 hover:text-white"}`}
                            >
                                <span className="mr-3"><FiCalendar /></span>
                                <span className="flex-1 text-left">Attendance</span>
                                <FiChevronDown className={`transition-transform ${attendanceDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {attendanceDropdownOpen && (
                                <div className="ml-8 space-y-1">
                                    <SidebarLink to="/dashboard/attendance/add" icon="📝" label="Add Attendance" active={isActive("/dashboard/attendance/add")} />
                                    <SidebarLink to="/dashboard/attendance/view" icon="📋" label="View Attendance" active={isActive("/dashboard/attendance/view")} />
                                </div>
                            )}
                        </div>

                        <SidebarLink to="#" icon={<FiSettings />} label="Payroll" />
                        <SidebarLink to="#" icon={<FiSettings />} label="Reports" />
                        <SidebarLink to="#" icon={<FiSettings />} label="Tax & Compliance" />
                    </nav>

                    {/* User Profile Bottom */}
                    <div className="border-t border-gray-800 p-4 flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-indigo-700 font-bold uppercase">
                                {user?.username?.charAt(0) || "U"}
                            </div>
                            <span>{user?.username || "User"}</span>
                        </div>
                        <button onClick={handleLogout} className="text-white hover:text-red-400 transition">
                            <FiLogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                {/* Top Navbar */}
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-20">
                    {/* Left: Menu + Title */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gray-700 hover:text-indigo-600"
                        >
                            <BiMenuAltRight size={24} />
                        </button>
                        <h1 className="text-xl font-bold text-indigo-600 tracking-widest">Dashboard</h1>
                    </div>

                    {/* Right: Date + User Avatar with Dropdown */}
                    <div className="flex items-center space-x-4 relative">
                        <span className="text-gray-500 text-sm hidden md:block">
                            {new Date().toLocaleDateString()}
                        </span>

                        {/* Avatar with hover dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            {/* Avatar */}
                            <div className="w-10 h-10 bg-indigo-200 text-indigo-700 rounded-full flex items-center justify-center font-semibold uppercase cursor-pointer">
                                {user?.username?.charAt(0) || "U"}
                            </div>

                            {/* Dropdown */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <Link
                                        to="/dashboard/profile"
                                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                                    >
                                        <FiUser /> <span>Profile</span>
                                    </Link>
                                    <Link
                                        to="/change-password"
                                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                                    >
                                        <FiKey /> <span>Change Password</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            window.location.href = "/login";
                                        }}
                                        className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                                    >
                                        <FiLogOut /> <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </header>
                {/* Main Content */}
                <main className="p-6 lg:p-10 bg-gray-50 min-h-[calc(100vh-80px)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
const SidebarLink = ({ to, icon, label, active }) => {
    return (
        <Link
            to={to}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-purple-600/70 ${active ? "bg-purple-700/80 font-semibold" : "text-gray-300 hover:text-white"}`}
        >
            <span className="mr-3">{icon}</span>
            <span>{label}</span>
        </Link>
    );
};
