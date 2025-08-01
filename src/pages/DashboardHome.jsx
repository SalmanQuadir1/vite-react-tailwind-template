/* eslint-disable react/prop-types */
import { FiUsers, FiClock, FiDollarSign } from "react-icons/fi";

const DashboardHome = () => {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Welcome back, Salman 👋</h2>
                <p className="text-gray-500 mt-1 text-sm">Here’s what’s happening today.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <Card
                    title="Total Employees"
                    value="103"
                    icon={<FiUsers size={22} />}
                    bg="bg-green-100"
                    text="text-green-700"
                />
                <Card
                    title="Payroll Processed"
                    value="₹40,000"
                    icon={<FiDollarSign size={22} />}
                    bg="bg-purple-100"
                    text="text-purple-700"
                />
                <Card
                    title="Pending Pay"
                    value="₹40,000"
                    icon={<FiClock size={22} />}
                    bg="bg-yellow-100"
                    text="text-yellow-700"
                />
                <Card
                    title="Tax Deductions"
                    value="₹6,000"
                    icon={<FiDollarSign size={22} />}
                    bg="bg-red-100"
                    text="text-red-700"
                />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Payroll Activities */}
                <div className="xl:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Payroll Activities</h3>
                    <div className="space-y-4 text-sm text-gray-600">
                        <Activity name="John Doe" role="Web Developer" status="Paid" />
                        <Activity name="Jane Smith" role="UI/UX Designer" status="Paid" />
                        <Activity name="Ali Khan" role="Product Manager" status="Pending" />
                        <Activity name="Vikram" role="HR Executive" status="Pending" />
                    </div>
                </div>

                {/* Right Widgets */}
                <div className="space-y-6">
                    {/* Attendance */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance</h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            <Attendance name="John" status="On Time" />
                            <Attendance name="Jane" status="Late" />
                            <Attendance name="Ali" status="Absent" />
                            <Attendance name="Vikram" status="On Time" />
                        </div>
                    </div>

                    {/* Announcement */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Announcement</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>🎯 Submit payroll by March 25</li>
                            <li>📌 Declare investments before March 30</li>
                            <li>📝 Upload Form 16 by April 5</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;

// 👉 Components
// eslint-disable-next-line react/prop-types
const Card = ({ title, value, icon, bg, text }) => (
    <div className={`rounded-xl p-5 shadow-sm flex items-center ${bg} ${text}`}>
        <div className="p-3 bg-white rounded-full shadow mr-4">{icon}</div>
        <div>
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const Activity = ({ name, role, status }) => {
    const badgeColor = status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";
    return (
        <div className="flex justify-between items-center">
            <div>
                <p className="font-medium">{name}</p>
                <p className="text-xs text-gray-400">{role}</p>
            </div>
            <span className={`px-3 py-1 text-xs rounded-full font-medium ${badgeColor}`}>{status}</span>
        </div>
    );
};

const Attendance = ({ name, status }) => {
    const badge = {
        "On Time": "bg-green-100 text-green-700",
        Late: "bg-yellow-100 text-yellow-700",
        Absent: "bg-red-100 text-red-700",
    }[status];

    return (
        <div className="flex justify-between items-center">
            <span>{name}</span>
            <span className={`px-3 py-1 text-xs rounded-full font-medium ${badge}`}>{status}</span>
        </div>
    );
};
