import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../../features/employeeSlice";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

export default function ViewEmployees() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { employees, loading, error } = useSelector((state) => state.employee);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleEdit = (id) => {
        navigate(`/dashboard/employee/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            const result = await dispatch(deleteEmployee(id));
            if (deleteEmployee.fulfilled.match(result)) {
                toast.success("Employee deleted successfully");
            } else {
                toast.error("Failed to delete employee");
            }
        }
    };

    const columns = [
        // {
        //     name: "#",
        //     selector: (row, index) => index + 1,
        //     width: "60px",
        // },
        {
            name: "Full Name",
            selector: row => row.fullName,
            sortable: true,
        },
        {
            name: "Phone",
            selector: row => row.phone,
        },
        // {
        //     name: "Gender",
        //     selector: row => row.gender,
        // },
        // {
        //     name: "DOB",
        //     selector: row => row.dob,
        // },
        // {
        //     name: "Address",
        //     selector: row => row.address,
        // },
        {
            name: "Designation",
            selector: row => row.designation,
        },
        {
            name: "Department",
            selector: row => row?.department?.name,
        },
        {
            name: "Company",
            selector: row => row?.company?.name,
        },
        // {
        //     name: "Joining Date",
        //     selector: row => row.joiningDate,
        // },
        {
            name: "Status",
            selector: row => row.status,
            cell: row => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : row.status === "INACTIVE"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                    {row.status}
                </span>
            ),
            width: "8rem",
            sortable: true,
        },
        {
            name: "Actions",
            cell: row => (
                <div className="flex gap-3">
                    <button
                        onClick={() => handleEdit(row.employeeId)}
                        className="text-indigo-600 hover:text-indigo-800"
                        title="Edit"
                    >
                        <FiEdit2 size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(row.employeeId)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];


    return (
        <div className="w-full px-2 md:px-4 py-4 bg-white rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-700 uppercase tracking-[1rem] ml-1 ">All Employees</h2>

            {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4">
                    {error}
                </div>
            )}

            <DataTable
                columns={columns}
                data={employees}
                progressPending={loading}
                pagination
                highlightOnHover
                responsive
                striped
                noHeader
            />
        </div>
    );
}
