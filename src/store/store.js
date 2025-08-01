// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import employeeReducer from "../features/employeeSlice";
import companyReducer from "../features/companySlice";
import departmentReducer from "../features/departmentSlice";
import attendanceReducer from "../features/attendanceSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employee: employeeReducer,
        company: companyReducer,
        department: departmentReducer,
        attendance: attendanceReducer,
    },
});
