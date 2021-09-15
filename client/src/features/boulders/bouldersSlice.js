import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteArea } from "../areas/areasSlice";

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

export const bouldersSlice = createSlice({
    name: "boulders",
    initialState: {
        boulders: [],
        searchedFilter: [],
        availableTags: ["powerful", "endurance", "technical", "highball", "lowball", "crimpy", "slopey"],
        status: null
    },
    reducers: {
        clearFilter: (state) => {
            state.searchedFilter = []
        },
        resetStatus: (state) => {
            state.status = null;
        }
    },
    extraReducers: {
        [addBoulder.pending]: (state) => {
            state.status = "loading";
        },
        [addBoulder.fulfilled]: (state, action) => {
            switch (action.payload.success) {
                case true:
                    state.boulders = [...state.boulders, action.payload.boulder];
                    state.status = "success";
                    break;
                case false:
                    state.status = "failed"
                    break;
                default:
                    state.status = null;
                    break;
            }
        },
        [addBoulder.rejected]: (state, action) => {
            state.status = "failed";
        },
        [fetchBoulders.pending]: (state) => {
            state.status = "loading";
        },
        [fetchBoulders.fulfilled]: (state, action) => {
            state.boulders = action.payload;
            state.status = "success";
        },
        [fetchBoulders.rejected]: (state) => {
            state.status = "failed";
        },
        [deleteBoulder.pending]: (state) => {
            state.status = "loading";
        },
        [deleteBoulder.fulfilled]: (state, action) => {
            const filteredBoulders = state.boulders.filter((boulder) => boulder._id !== action.payload);
            state.boulders = filteredBoulders;
            state.status = "success";
        },
        [deleteBoulder.rejected]: (state) => {
            state.status = "failed";
        },
        [editBoulder.pending]: (state) => {
            state.status = "loading";
        },
        [editBoulder.fulfilled]: (state, action) => {
            switch (action.payload.success) {
                case true:
                    const editedBouldersList = state.boulders.map((boulder) => boulder._id === action.payload.boulder._id ? action.payload.boulder : boulder);
                    state.boulders = editedBouldersList;
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
        [editBoulder.rejected]: (state) => {
            state.status = "failed";
        },
        [searchBoulderName.pending]: (state) => {
            state.status = "loading";
        },
        [searchBoulderName.fulfilled]: (state, action) => {
            state.searchedFilter = action.payload;
            state.status = "success";
        },
        [searchBoulderName.rejected]: (state) => {
            state.status = "failed";
        },
        [addCommentToBoulder.pending]: (state) => {
            state.status = "loading";
        },
        [addCommentToBoulder.fulfilled]: (state, action) => {
            switch (action.payload.success) {
                case true:
                    const editedBouldersList = state.boulders.map((boulder) => boulder._id === action.payload.boulder._id ? action.payload.boulder : boulder);
                    state.boulders = editedBouldersList;
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
        [addCommentToBoulder.rejected]: (state) => {
            state.status = "failed";
        },
        [deleteCommentFromBoulder.pending]: (state) => {
            state.status = "loading";
        },
        [deleteCommentFromBoulder.fulfilled]: (state, action) => {
            switch (action.payload.success) {
                case true:
                    const editedBouldersList = state.boulders.map((boulder) => boulder._id === action.payload.boulder._id ? action.payload.boulder : boulder);
                    state.boulders = editedBouldersList;
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
        [deleteCommentFromBoulder.rejected]: (state) => {
            state.status = "failed";
        },
        [fetchOneBoulder.pending]: (state) => {
            state.status = "loading";
        },
        [fetchOneBoulder.fulfilled]: (state, action) => {
            // if the action payload is already in state boulders, just return state
            switch (action.payload.success) {
                case true:
                    if (!state.boulders.find((boulder) => boulder._id === action.payload.boulder._id)) {
                        state.boulders = [...state.boulders, action.payload.boulder]
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
        [fetchOneBoulder.rejected]: (state, action) => {
            state.status = "failed";
        },
        [deleteArea.pending]: (state, action) => {
            state.status = "loading";
        },
        [deleteArea.fulfilled]: (state, action) => {
            // NEED TO TEST THIS ONE
            console.log("boulders extra reducer", action.payload.descendents)
            const { descendents } = action.payload;
            const parentArea = action.payload.area;

            let allBoulders;
            if (descendents.length > 0) {
                // grab all the boulders from the descendents
                // filter them from the state boulders array
                const descBoulders = descendents.map((d) => d.boulders).flat();
                allBoulders = descBoulders.concat(parentArea.boulders).flat();
            } else {
                allBoulders = parentArea.boulders;
            }

            const newState = state.boulders.filter((boulder) => !allBoulders.includes(boulder))
            state.boulders = newState;


            state.status = "success";
        },
        [deleteArea.rejected]: (state, action) => {
            state.status = "failed";
        },
    }
})


export const { clearFilter, resetStatus } = bouldersSlice.actions;
export default bouldersSlice.reducer;