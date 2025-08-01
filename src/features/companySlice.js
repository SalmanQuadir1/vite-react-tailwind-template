// src/features/companies/companySlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/axiosInstance"; // same as employee slice

// Thunks
export const fetchCompanies = createAsyncThunk("companies/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const res = await api.get("/companies");

        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const getCompanyById = createAsyncThunk("companies/getById", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/companies/${id}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const createCompany = createAsyncThunk("companies/create", async (companyData, { rejectWithValue }) => {
    try {
        const res = await api.post("/companies", companyData);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const updateCompany = createAsyncThunk("companies/update", async ({ id, companyData }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/companies/${id}`, companyData);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const deleteCompany = createAsyncThunk("companies/delete", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/companies/${id}`);
        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

// Slice
const companySlice = createSlice({
    name: "companies",
    initialState: {
        companies: [],
        selectedCompany: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedCompany: (state) => {
            state.selectedCompany = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.companies = action.payload;
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getCompanyById.fulfilled, (state, action) => {
                state.selectedCompany = action.payload;
            })

            .addCase(createCompany.fulfilled, (state, action) => {
                state.companies.push(action.payload);
            })

            .addCase(updateCompany.fulfilled, (state, action) => {
                const index = state.companies.findIndex(c => c.id === action.payload.id);
                if (index !== -1) state.companies[index] = action.payload;
            })

            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.companies = state.companies.filter(c => c.id !== action.payload);
            });
    },
});

export const { clearSelectedCompany } = companySlice.actions;
export default companySlice.reducer;
