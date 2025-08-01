// store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', formData);
            console.log(res);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));


                // try {
                //     const decoded = jwtDecode(action.payload.token);
                //     state.user = decoded.user || decoded; // adjust based on structure
                // } catch {
                //     state.user = null;
                // }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
