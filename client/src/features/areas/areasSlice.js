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

export const areasSlice = createSlice({
    name: "areas",
    initialState: {
        areas: [],
        status: null
    },
    reducers: {
    },
    extraReducers: {
        [fetchAreas.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchAreas.fulfilled]: (state, action) => {
            switch (action.payload.success) {
                case true:
                    state.areas = [...action.payload.areas];
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
        },
        [fetchOneArea.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchOneArea.fulfilled]: (state, action) => {
            switch (action.payload.success) {
                case true:
                    const isFound = state.areas.find((area) => area._id === action.payload.area._id);
                    if (!isFound) {
                        state.areas = [...state.areas, action.payload.area];
                    }
                    state.status = "success";
                    break;
                case false:
                    state.status = "failed";
                    break;
                default:
                    state.status = null;
                    break;
            }
        },
        [fetchOneArea.rejected]: (state, action) => {
            state.status = "failed";
        },
        [addArea.pending]: (state, action) => {
            state.status = "loading";
        },
        [addArea.fulfilled]: (state, action) => {
            switch (action.payload.success) {
                case true:
                    state.areas = [...state.areas, action.payload.area];

                    // state.areas.map((area) => area._id === parentId ? [...area.areas, action.payload.area])
                    // need to update parent area with this new sub area 
                    state.status = "success";
                    break;
                case false:
                    state.status = "failed";
                    break;
                default:
                    state.status = null;
                    break;
            }
        },
        [addArea.rejected]: (state, action) => {
            state.status = "failed";
        },
        [deleteArea.pending]: (state, action) => {
            state.status = "loading";
        },
        [deleteArea.fulfilled]: (state, action) => {
            console.log("action payload: ", action.payload)
            const parentArea = action.payload.area;
            const { descendents } = action.payload;

            let newState;
            // if the area to delete has descendents
            if (action.payload.descendents.length > 0) {
                // delete all sub areas
                newState = state.areas.filter((area) => {
                    return (descendents.findIndex((d) => d._id === area._id) === -1)
                })
                newState = newState.filter((area) => area._id !== parentArea._id)
            } else {
                newState = state.areas.filter((area) => area._id !== parentArea._id);
            }

            state.areas = newState;
            state.status = "success";
        },
        [deleteArea.rejected]: (state, action) => {
            state.status = "failed";
        },
    }
})

export default areasSlice.reducer;