import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/axiosInstance";

// Thunks
export const fetchDepartments = createAsyncThunk("departments/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const res = await api.get("/departments");
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const getDepartmentById = createAsyncThunk("departments/getById", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/departments/${id}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const createDepartment = createAsyncThunk("departments/create", async ({ departmentData, token }, { rejectWithValue }) => {
    try {
        const res = await api.post("/departments", departmentData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const updateDepartment = createAsyncThunk("departments/update", async ({ departmentId, departmentData }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/departments/${departmentId}`, departmentData);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const deleteDepartment = createAsyncThunk("departments/delete", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/departments/${id}`);
        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

// Slice
const departmentSlice = createSlice({
    name: "departments",
    initialState: {
        departments: [],
        selectedDepartment: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedDepartment: (state) => {
            state.selectedDepartment = null;
        },
        resetDepartmentState: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.departments = action.payload;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getDepartmentById.fulfilled, (state, action) => {
                state.selectedDepartment = action.payload;
            })

            .addCase(createDepartment.fulfilled, (state, action) => {
                state.departments.push(action.payload);
            })

            .addCase(updateDepartment.fulfilled, (state, action) => {
                const index = state.departments.findIndex(d => d.id === action.payload.id);
                if (index !== -1) state.departments[index] = action.payload;
            })

            .addCase(deleteDepartment.fulfilled, (state, action) => {
                state.departments = state.departments.filter(d => d.id !== action.payload);
            });
    },
});

export const { clearSelectedDepartment, resetDepartmentState } = departmentSlice.actions;
export default departmentSlice.reducer;
