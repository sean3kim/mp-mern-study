import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000";

export const fetchAreas = createAsyncThunk(
    "areas/fetchAreas",
    async () => {
        const { data } = await axios.get(`${url}/areas`, { withCredentials: true });
        return data;
    }
)

export const areasSlice = createSlice({
    name: "areas",
    initialState: {
        name: null,
        areas: [],
        boulders: [],
        path: [],
        parent: null,
        status: null
    },
    reducers: {
    },
    extraReducers: {
        [fetchAreas.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchAreas.fulfilled]: (state, action) => {
            console.log("action payload", action.payload)
            switch (action.payload.success) {
                case true:
                    state.areas = [...state.areas, ...action.payload.areas];
                    state.status = "success";
                    break;
                case false:
                    state.status = "failed";
                    break;
                default:
                    break;
            }
        },
        [fetchAreas.rejected]: (state, action) => {
            state.status = "failed"
        }
    }
})

export default areasSlice.reducer;