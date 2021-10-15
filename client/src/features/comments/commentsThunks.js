import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const url = "http://localhost:5000";
const url = "https://mp-mern.herokuapp.com";

export const addComment = createAsyncThunk(
    "comments/addComment",
    async ({ comment, boulderId, userId }) => {
        try {
            const { data } = await axios.put(`${url}/api/show/${boulderId}/add_comment`, { comment, userId });
            console.log("data", data)
            return data;
        } catch (error) {
            return error.response.data
        }
    }
)


export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async ({ boulderId, commentId, userId }) => {
        try {
            const { data } = await axios.delete(`${url}/api/show/${boulderId}`, { data: { commentId, userId } });
            return data;
        } catch (error) {
            return error.response.data
        }
    }
)