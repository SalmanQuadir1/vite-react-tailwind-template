import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAttendance } from "../../features/attendanceSlice";
import { toast } from "react-toastify";
import { fetchCompanies } from "../../features/companySlice";
import { fetchDepartments } from "../../features/departmentSlice";
import { fetchEmployees } from "../../features/employeeSlice";

export default function AddAttendanceForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { employees } = useSelector((state) => state.employee);
    const { companies } = useSelector((state) => state.company);

    const [formData, setFormData] = useState({
        companyId: user?.companyId || "",
        employeeId: "",
        date: "",
        checkInTime: "",
        checkOutTime: "",
        status: "Present"
    });

    useEffect(() => {
        dispatch(fetchCompanies());
        dispatch(fetchEmployees());
    }, [])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addAttendance(formData)).unwrap();
            toast.success("Attendance Successful");
            navigate("/dashboard/attendance/view");
        } catch (error) {
            toast.error("Failed to add attendance");
            console.error("Attendance error:", error);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-700">Add Attendance</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Company</label>
                    <select
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">-- Select Company --</option>
                        {companies?.map((company) => (
                            <option key={company.id} value={company.companyId}>{company.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Employee</label>
                    <select
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">-- Select Employee --</option>
                        {employees?.map((emp) => (
                            <option key={emp.id} value={emp.employeeId}>
                                {emp.fullName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Check-In Time</label>
                        <input
                            type="time"
                            name="checkInTime"
                            value={formData.checkInTime}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Check-Out Time</label>
                        <input
                            type="time"
                            name="checkOutTime"
                            value={formData.checkOutTime}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Leave">Leave</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                    Submit Attendance
                </button>
            </form>
        </div>
    );
}
