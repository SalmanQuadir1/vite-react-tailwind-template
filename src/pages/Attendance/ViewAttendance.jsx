import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAttendance, fetchAttendance } from "../../features/attendanceSlice";
import { toast } from "react-toastify";

import { BiPencil, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function ViewAttendance() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { records, loading, error } = useSelector((state) => state.attendance);

    useEffect(() => {
        dispatch(fetchAttendance());
    }, [dispatch]);

    const getStatusBadge = (status) => {
        const base = "px-2 py-1 rounded-full text-sm font-semibold";
        switch (status) {
            case "Present":
                return `${base} bg-green-100 text-green-700`;
            case "Absent":
                return `${base} bg-red-100 text-red-700`;
            case "Leave":
                return `${base} bg-yellow-100 text-yellow-700`;
            default:
                return `${base} bg-gray-100 text-gray-700`;
        }
    };

    const handleEdit = (id) => {
        try {
            toast.info(`Edit action clicked for ID: ${id}`);
            navigate(`/dashboard/attendance/edit/${id}`);
        } catch (error) {
            toast.info(`Edit action clicked for ID: ${id}`);

        }

    };

    const handleDelete = (id) => {
        try {
            dispatch(deleteAttendance(id));
            toast.success("Attendance Deleted Successfully")
            navigate(`/dashboard/attendance/view`);
        }
        catch {

            toast.warn(`Delete action clicked for ID: ${id}`);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
                Attendance Records
            </h2>

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">Error: {error}</p>
            ) : (
                <div className="overflow-x-auto shadow rounded-lg">
                    <table className="min-w-full bg-white border border-gray-200 text-sm">
                        <thead className="bg-indigo-100 sticky top-0">
                            <tr className="text-left text-gray-700">
                                <th className="px-4 py-3 border">#</th>
                                <th className="px-4 py-3 border">Company</th>
                                <th className="px-4 py-3 border">Employee</th>
                                <th className="px-4 py-3 border">Date</th>
                                <th className="px-4 py-3 border">Check-In</th>
                                <th className="px-4 py-3 border">Check-Out</th>
                                <th className="px-4 py-3 border">Status</th>
                                <th className="px-4 py-3 border text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-6 text-gray-500">
                                        No attendance records found.
                                    </td>
                                </tr>
                            ) : (
                                records.map((record, index) => (
                                    <tr key={record.id} className="hover:bg-gray-50 transition-all">
                                        <td className="border px-4 py-3">{index + 1}</td>
                                        <td className="border px-4 py-3">{record.company?.name || "N/A"}</td>
                                        <td className="border px-4 py-3">{record.employee?.fullName}</td>
                                        <td className="border px-4 py-3">{record.date}</td>
                                        <td className="border px-4 py-3">{record.checkInTime}</td>
                                        <td className="border px-4 py-3">{record.checkOutTime}</td>
                                        <td className="border px-4 py-3">
                                            <span className={getStatusBadge(record.status)}>{record.status}</span>
                                        </td>
                                        <td className="border px-4 py-3 text-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(record.attendanceId)}
                                                className="text-blue-600 hover:text-blue-800 transition"
                                            >
                                                <BiPencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(record.attendanceId)}
                                                className="text-red-600 hover:text-red-800 transition"
                                            >
                                                <BiTrash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
