// src/features/attendance/attendanceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/axiosInstance";

// Fetch all attendance records
export const fetchAttendance = createAsyncThunk(
    "attendance/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/attendance");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Add attendance record
export const addAttendance = createAsyncThunk(
    "attendance/add",
    async (attendanceData, { rejectWithValue }) => {
        try {
            const res = await api.post("/attendance", attendanceData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Edit attendance record
export const editAttendance = createAsyncThunk(
    "attendance/edit",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/attendance/${id}`, updatedData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Delete attendance record
export const deleteAttendance = createAsyncThunk(
    "attendance/delete",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/attendance/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Slice
const attendanceSlice = createSlice({
    name: "attendance",
    initialState: {
        records: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchAttendance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAttendance.fulfilled, (state, action) => {
                state.loading = false;
                state.records = action.payload;
            })
            .addCase(fetchAttendance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add
            .addCase(addAttendance.fulfilled, (state, action) => {
                state.records.unshift(action.payload);
            })

            // Edit
            .addCase(editAttendance.fulfilled, (state, action) => {
                const index = state.records.findIndex((r) => r.id === action.payload.id);
                if (index !== -1) {
                    state.records[index] = action.payload;
                }
            })

            // Delete
            .addCase(deleteAttendance.fulfilled, (state, action) => {
                state.records = state.records.filter((r) => r.id !== action.payload);
            });
    },
});

export default attendanceSlice.reducer;
