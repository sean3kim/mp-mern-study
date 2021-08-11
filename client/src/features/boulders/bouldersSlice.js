import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000";

export const fetchBoulders = createAsyncThunk(
    "boulders/fetch",
    async () => {
        const { data } = await axios.get(`${url}/`);
        return data;
    }
)

export const fetchOneBoulder = createAsyncThunk(
    "boulders/fetchOne",
    async (id) => {
        const { data } = await axios.get(`${url}/show/${id}`)
        return data;
    }
)

// export const fetchAreaBoulders = createAsyncThunk(
//     "boulders/fetchArea",
//     async () => {
//         const {data} = await axios.get(`${url}/area`)
//     }
// )

export const addBoulder = createAsyncThunk(
    "boulders/add",
    async (boulder) => {
        const { data } = await axios.post(`${url}/new`, boulder)
        return data;
    }
)

export const addCommentToBoulder = createAsyncThunk(
    "boulders/addComment",
    async ({ comment, boulderId }) => {
        const { data } = await axios.put(`${url}/show/${boulderId}/add_comment`, comment);
        return data;
    }
)

export const deleteBoulder = createAsyncThunk(
    "boulders/delete",
    async (id) => {
        await axios.delete(url, { data: { id } });
        return id;
    }
)

export const deleteCommentFromBoulder = createAsyncThunk(
    "boulders/deleteComment",
    async ({ boulderId, commentId }) => {
        const { data } = await axios.delete(`${url}/show/${boulderId}`, { data: { commentId } });
        return data;
    }
)

export const editBoulder = createAsyncThunk(
    "boulders/edit",
    async (boulder) => {
        await axios.put(url, boulder);
        return boulder;
    }
)

export const searchBoulderName = createAsyncThunk(
    "boulders/searchBoulderName",
    async (querystring) => {
        const { data } = await axios.get(`${url}/search${querystring}`);
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
        }
    },
    extraReducers: {
        [addBoulder.pending]: (state) => {
            state.status = "loading";
        },
        [addBoulder.fulfilled]: (state, action) => {
            state.boulders = [...state.boulders, action.payload];
            state.status = "success";
        },
        [addBoulder.rejected]: (state) => {
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
            const editedBouldersList = state.boulders.map((boulder) => boulder._id === action.payload._id ? action.payload : boulder);
            state.boulders = editedBouldersList;
            state.status = "success";
        },
        [editBoulder.rejected]: (state) => {
            state.status = "failed";
        },
        [searchBoulderName.pending]: (state, action) => {
            state.status = "loading";
        },
        [searchBoulderName.fulfilled]: (state, action) => {
            state.searchedFilter = action.payload;
            state.status = "success";
        },
        [searchBoulderName.rejected]: (state, action) => {
            state.status = "failed";
        },
        [addCommentToBoulder.pending]: (state, action) => {
            state.status = "loading";
        },
        [addCommentToBoulder.fulfilled]: (state, action) => {
            const editedBouldersList = state.boulders.map((boulder) => boulder._id === action.payload._id ? action.payload : boulder);
            state.boulders = editedBouldersList;
            state.status = "success";
        },
        [addCommentToBoulder.rejected]: (state, action) => {
            state.status = "failed";
        },
        [deleteCommentFromBoulder.pending]: (state, action) => {
            state.status = "loading";
        },
        [deleteCommentFromBoulder.fulfilled]: (state, action) => {
            const editedBouldersList = state.boulders.map((boulder) => boulder._id === action.payload._id ? action.payload : boulder);
            state.boulders = editedBouldersList;
            state.status = "success";
        },
        [deleteCommentFromBoulder.rejected]: (state, action) => {
            state.status = "failed";
        },
        [fetchOneBoulder.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchOneBoulder.fulfilled]: (state, action) => {
            // if the action payload is already in state boulders, just return state
            if (!state.boulders.find((boulder) => boulder._id === action.payload._id)) {
                state.boulders = [...state.boulders, action.payload]
            }
            state.status = "success";
        },
        [fetchOneBoulder.rejected]: (state, action) => {
            state.status = "failed";
        },
    }
})


export const { clearFilter } = bouldersSlice.actions;
export default bouldersSlice.reducer;