
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const url = "http://localhost:5000";
const url = "https://mp-mern.herokuapp.com";

export const registerUser = createAsyncThunk(
    "users/register",
    async (user) => {
        try {
            const { data } = await axios.post(`${url}/api/register`, user, { withCredentials: true })
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
            const { data } = await axios.post(`${url}/api/login`, user, { withCredentials: true })
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
        await axios.post(`${url}/api/logout`, user, { withCredentials: true })
        return
    }
)

export const checkLoggedIn = createAsyncThunk(
    "users/checkLoggedIn",
    async () => {
        const { data } = await axios.get(`${url}/api/checkLoggedIn`, { withCredentials: true })
        return data
    }
)
