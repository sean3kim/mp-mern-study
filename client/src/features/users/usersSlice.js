import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000";

export const registerUser = createAsyncThunk(
    "users/register",
    async (user) => {
        const { data } = await axios.post(`${url}/register`, user, { withCredentials: true })
        return data;
    }
)

export const loginUser = createAsyncThunk(
    "users/login",
    async (user) => {
        await axios.post(`${url}/login`, user, { withCredentials: true })
        return
    }
)

export const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isLoggedIn: false,
        status: null
    },
    reducers: {
    },
    extraReducers: {
        [registerUser.pending]: (state, action) => {
            state.status = "loading"
        },
        [registerUser.fulfilled]: (state, action) => {
            state.users = [...state.users, action.payload]
            state.status = "success"
        },
        [registerUser.rejected]: (state, action) => {
            state.status = "failed"
        },
        [loginUser.pending]: (state, action) => {
            state.status = "loading"
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.status = "success"
        },
        [loginUser.rejected]: (state, action) => {
            state.status = "failed"
        },

    }
})


export default userSlice.reducer;