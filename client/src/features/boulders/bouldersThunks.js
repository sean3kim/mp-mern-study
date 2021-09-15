import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000";

export const fetchBoulders = createAsyncThunk(
    "boulders/fetch",
    async () => {
        const { data } = await axios.get(`${url}/`, { withCredentials: true });
        return data;
    }
)

export const fetchOneBoulder = createAsyncThunk(
    "boulders/fetchOne",
    async (id) => {
        try {
            const { data } = await axios.get(`${url}/show/${id}`, { withCredentials: true })
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
            const { data } = await axios.post(`${url}/new`, boulder, { withCredentials: true })
            return data;
        } catch (error) {
            return error.response.data
        }
    }
)

export const addCommentToBoulder = createAsyncThunk(
    "boulders/addComment",
    async ({ comment, boulderId, userId }) => {
        try {
            const { data } = await axios.put(`${url}/show/${boulderId}/add_comment`, { comment, userId });
            console.log("data", data)
            return data;
        } catch (error) {
            return error.response.data
        }
    }
)

export const deleteBoulder = createAsyncThunk(
    "boulders/delete",
    async (id) => {
        await axios.delete(url, { data: { id } }, { withCredentials: true });
        return id;
    }
)

export const deleteCommentFromBoulder = createAsyncThunk(
    "boulders/deleteComment",
    async ({ boulderId, commentId, userId }) => {
        try {
            const { data } = await axios.delete(`${url}/show/${boulderId}`, { data: { commentId, userId } });
            return data;
        } catch (error) {
            return error.response.data
        }
    }
)

export const editBoulder = createAsyncThunk(
    "boulders/edit",
    async (boulder) => {
        try {
            console.log("in slice: ", boulder)
            await axios.put(`${url}/edit/${boulder._id}`, boulder, { withCredentials: true });
            return { success: true, boulder };
        } catch (error) {
            return error.response.data
        }
    }
)

export const searchBoulderName = createAsyncThunk(
    "boulders/searchBoulderName",
    async (querystring) => {
        const { data } = await axios.get(`${url}/search${querystring}`, { withCredentials: true });
        return data;
    }
)