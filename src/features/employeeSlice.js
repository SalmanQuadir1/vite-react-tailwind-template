// src/features/employees/employeeSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/axiosInstance";

// Async Thunks
export const fetchEmployees = createAsyncThunk("employees/fetchAll", async () => {
    const response = await api.get("/employees");
    return response.data;
});

export const getEmployeeById = createAsyncThunk("employees/getById", async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
});

export const createEmployee = createAsyncThunk("employees/create", async (employee) => {
    const response = await api.post("/employees", employee);
    return response.data;
});

export const updateEmployee = createAsyncThunk("employees/update", async ({ id, employee }) => {
    const response = await api.put(`/employees/${id}`, employee);
    return response.data;
});

export const deleteEmployee = createAsyncThunk("employees/delete", async (id) => {
    await api.delete(`/employees/${id}`);
    return id;
});

// Slice
const employeeSlice = createSlice({
    name: "employees",
    initialState: {
        employees: [],
        selectedEmployee: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedEmployee: (state) => {
            state.selectedEmployee = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getEmployeeById.fulfilled, (state, action) => {
                state.selectedEmployee = action.payload;
            })

            .addCase(createEmployee.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })

            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.employees.findIndex(emp => emp.id === action.payload.id);
                if (index !== -1) state.employees[index] = action.payload;
            })

            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(emp => emp.id !== action.payload);
            });
    },
});

export const { clearSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
