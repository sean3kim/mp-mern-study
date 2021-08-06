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

export const addBoulder = createAsyncThunk(
    "boulders/add",
    async (boulder) => {
        const { data } = await axios.post(`${url}/new`, boulder)
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
        status: null
    },
    reducers: {
        clearFilter: (state, action) => {
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
            const editeBouldersList = state.boulders.map((boulder) => boulder._id === action.payload._id ? action.payload : boulder);
            state.boulders = editeBouldersList;
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
    }
})


export const { clearFilter } = bouldersSlice.actions;
export default bouldersSlice.reducer;