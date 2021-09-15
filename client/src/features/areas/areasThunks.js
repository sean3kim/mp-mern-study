import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000";

export const fetchAreas = createAsyncThunk(
    "areas/fetchAreas",
    async () => {
        const { data } = await axios.get(`${url}/areas`, { withCredentials: true });
        return data;
    }
)

export const fetchOneArea = createAsyncThunk(
    "areas/fetchOneArea",
    async (id) => {
        try {
            const { data } = await axios.get(`${url}/areas/show/${id}`, { withCredentials: true })
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
            const { data } = await axios.post(`${url}/areas/new`, area, { withCredentials: true })
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
            const { data } = await axios.delete(`${url}/areas`, { data: { id: area._id } }, { withCredentials: true })
            return data;
        } catch (error) {
            return error.response.data
        }
    }
)