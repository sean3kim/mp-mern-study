import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DEV } from "../../proddev";

// const url = "http://localhost:5000";
// const url = "https://mp-mern.herokuapp.com";
const url = DEV ? "http://localhost:5000" : "https://mp-mern.herokuapp.com";

export const fetchBoulders = createAsyncThunk(
    "boulders/fetch",
    async () => {
        const { data } = await axios.get(`${url}/api`, { withCredentials: true });
        return data;
    }
)

export const fetchOneBoulder = createAsyncThunk(
    "boulders/fetchOne",
    async (id) => {
        try {
            const { data } = await axios.get(`${url}/api/show/${id}`, { withCredentials: true })
            return data;
        } catch (error) {
            return error.response.data;
        }
    }
)

export const addBoulder = createAsyncThunk(
    "boulders/add",
    async (boulder) => {
        try {
            const { data } = await axios.post(`${url}/api/new`, boulder, { withCredentials: true })
            return data;
        } catch (error) {
            return error.response.data
        }
    }
)

export const deleteBoulder = createAsyncThunk(
    "boulders/delete",
    async (id) => {
        const { data } = await axios.delete(`${url}/api`, { data: { id } }, { withCredentials: true });
        return data;
    }
)

export const editBoulder = createAsyncThunk(
    "boulders/edit",
    async (boulder) => {
        try {
            await axios.put(`${url}/api/edit/${boulder._id}`, boulder, { withCredentials: true });
            return { success: true, boulder };
        } catch (error) {
            return error.response.data
        }
    }
)

export const searchBoulderName = createAsyncThunk(
    "boulders/searchBoulderName",
    async (querystring) => {
        const { data } = await axios.get(`${url}/api/search${querystring}`, { withCredentials: true });
        return data;
    }
)