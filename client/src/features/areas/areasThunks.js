import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DEV } from "../../proddev";

// const url = "http://localhost:5000";
// const url = "https://mp-mern.herokuapp.com";
const url = DEV ? "http://localhost:5000" : "https://mp-mern.herokuapp.com";

export const fetchAreas = createAsyncThunk(
    "areas/fetchAreas",
    async () => {
        const { data } = await axios.get(`${url}/api/areas`, { withCredentials: true });
        return data;
    }
)

export const fetchOneArea = createAsyncThunk(
    "areas/fetchOneArea",
    async (id) => {
        try {
            const { data } = await axios.get(`${url}/api/areas/show/${id}`, { withCredentials: true })
            return data;
        } catch (error) {
            return error.response.data;
        }
    }
)

export const addArea = createAsyncThunk(
    "areas/addArea",
    async (area) => {
        try {
            const { data } = await axios.post(`${url}/api/areas/new`, area, { withCredentials: true })
            return data;
        } catch (error) {
            return error.response.data
        }
    }
)

export const deleteArea = createAsyncThunk(
    "areas/deleteArea",
    async (area) => {
        try {
            const { data } = await axios.delete(`${url}/api/areas`, { data: { id: area._id } }, { withCredentials: true })
            return data;
        } catch (error) {
            return error.response.data
        }
    }
)