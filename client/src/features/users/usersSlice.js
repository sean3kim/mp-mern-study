import { createSlice } from "@reduxjs/toolkit";
import {
    registerUser,
    loginUser,
    logoutUser,
    checkLoggedIn
} from "./usersThunks";


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
                    state.users = { _id: action.payload.user._id, username: action.payload.user.username };
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
                    state.users = { _id: action.payload.user._id, username: action.payload.user.username };
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