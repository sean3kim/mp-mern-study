import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000";

export const addComment = createAsyncThunk(
    "comments/addComment",
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


export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async ({ boulderId, commentId, userId }) => {
        try {
            const { data } = await axios.delete(`${url}/show/${boulderId}`, { data: { commentId, userId } });
            return data;
        } catch (error) {
            return error.response.data
        }
    }
)