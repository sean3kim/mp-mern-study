import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000";

export const registerUser = createAsyncThunk(
    "users/register",
    async (user) => {
        try {
            const { data } = await axios.post(`${url}/register`, user, { withCredentials: true })
            return data;
        } catch (error) {
            return error.response.data;
        }
    }
)

export const loginUser = createAsyncThunk(
    "users/login",
    async (user) => {
        try {
            const { data } = await axios.post(`${url}/login`, user, { withCredentials: true })
            console.log(data)
            return data
        } catch (error) {
            return error.response.data;
        }
    }
)

export const logoutUser = createAsyncThunk(
    "users/logout",
    async (user) => {
        await axios.post(`${url}/logout`, user, { withCredentials: true })
        return
    }
)

export const checkLoggedIn = createAsyncThunk(
    "users/checkLoggedIn",
    async () => {
        const { data } = await axios.get(`${url}/checkLoggedIn`, { withCredentials: true })
        return data
    }
)

export const userSlice = createSlice({
    name: "users",
    initialState: {
        users: null,
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
            switch (action.payload.success) {
                case true:
                    state.users = { id: action.payload.user._id, username: action.payload.user.username };
                    state.isLoggedIn = true;
                    state.status = "success"
                    break;
                case false:
                    state.isLoggedIn = false;
                    state.status = "failed";
                    break
                default:
                    break;
            }
        },
        [registerUser.rejected]: (state, action) => {
            state.status = "failed"
        },
        [loginUser.pending]: (state, action) => {
            state.status = "loading"
        },
        [loginUser.fulfilled]: (state, action) => {
            switch (action.payload.success) {
                case true:
                    state.users = { id: action.payload.user._id, username: action.payload.user.username };
                    state.isLoggedIn = true;
                    state.status = "success"
                    break;
                case false:
                    state.isLoggedIn = false;
                    state.status = "failed";
                    break;
                default:
                    break;
            }
        },
        [loginUser.rejected]: (state, action) => {
            console.log("login reducer failed")
            state.isLoggedIn = false;
            state.status = "failed"
        },
        [logoutUser.pending]: (state, action) => {
            state.status = "loading"
        },
        [logoutUser.fulfilled]: (state, action) => {
            state.users = null;
            state.isLoggedIn = false;
            state.status = "success"
        },
        [logoutUser.rejected]: (state, action) => {
            state.status = "failed"
        },
        [checkLoggedIn.pending]: (state, action) => {
            state.status = "loading"
        },
        [checkLoggedIn.fulfilled]: (state, action) => {
            if (!action.payload) {
                state.isLoggedIn = false;
                state.status = "failed";
            } else {
                state.users = { _id: action.payload._id, username: action.payload.username }
                state.isLoggedIn = true;
                state.status = "success";
            }
            // console.log("checkloggedIn: ", action.payload)
            // state.users = action.payload;
            // action.payload ? state.isLoggedIn = true : state.isLoggedIn = false;
            // state.status = "success"
        },
        [checkLoggedIn.rejected]: (state, action) => {
            state.status = "failed"
        },

    }
})


export default userSlice.reducer;