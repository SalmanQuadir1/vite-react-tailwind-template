// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import { setUser, logout } from "./features/authSlice";
import { jwtDecode } from "jwt-decode";

// Pages
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import DashboardHome from "./pages/DashboardHome";
import Login from "./pages/Login";
import AddEmployee from "./pages/Employee/AddEmployee";
import ViewEmployees from "./pages/Employee/ViewEmployees";
import UpdateEmployee from "./pages/Employee/UpdateEmployee";
import AddCompany from "./pages/Company/AddCompany";
import Department from "./pages/Department/Department";
import UpdateDepartment from "./pages/Department/UpdateDepartment";
import AddAttendance from "./pages/Attendance/AddAttendance";
import ViewAttendance from "./pages/Attendance/ViewAttendance";
import ChangePassword from "./pages/user/ChangePassword";
import Profile from "./pages/user/Profile";

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // Decode token and set user on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      try {

        const decoded = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          dispatch(logout());
        } else {
          // If your token payload includes user data
          dispatch(setUser(JSON.parse(storedUser)));
        }
      } catch (err) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <>
      {/* ToastContainer to show global toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        {/* Redirect root path based on auth token */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        >
          <Route index element={<DashboardHome />} />
          <Route path="employee/add" element={<AddEmployee />} />
          <Route path="employee/view" element={<ViewEmployees />} />
          <Route path="employee/edit/:id" element={<UpdateEmployee />} />
          {/* Company */}
          <Route path="company/add" element={<AddCompany />} />
          <Route path="department/add" element={<Department />} />
          <Route path="department/edit/:id" element={<UpdateDepartment />} />
          {/* Attendance */}
          <Route path="attendance/add" element={<AddAttendance />} />
          <Route path="attendance/view" element={<ViewAttendance />} />
          {/* User */}
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
