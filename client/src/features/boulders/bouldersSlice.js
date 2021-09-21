import { createSlice } from "@reduxjs/toolkit";
import { deleteArea } from "../areas/areasThunks";
import {
    fetchBoulders,
    fetchOneBoulder,
    addBoulder,
    deleteBoulder,
    editBoulder,
    searchBoulderName
} from "./bouldersThunks";
import { addComment, deleteComment } from "../comments/commentsThunks";


export const bouldersSlice = createSlice({
    name: "boulders",
    initialState: {
        boulders: [],
        byId: {},
        allIds: [],
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
        [fetchBoulders.pending]: (state) => {
            state.status = "loading";
        },
        [fetchBoulders.fulfilled]: (state, action) => {
            let newState = {};
            action.payload.forEach((boulder) => {
                let commentIds = [];
                const boulderId = boulder._id;
                boulder.comments.forEach((comment) => {
                    commentIds.push(comment._id);
                })
                boulder = { ...boulder, comments: commentIds };
                newState[boulderId] = boulder;
                state.allIds = [...state.allIds, boulderId];
            })

            state.byId = newState;
            state.status = "success";
        },
        [fetchBoulders.rejected]: (state) => {
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
                        let commentIds = [];
                        action.payload.boulder.comments.forEach((comment) => {
                            commentIds.push(comment._id);
                        })
                        const fetched = { ...action.payload.boulder, comments: commentIds }
                        state.boulders = [...state.boulders, fetched];
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
        [addBoulder.pending]: (state) => {
            state.status = "loading";
        },
        [addBoulder.fulfilled]: (state, action) => {
            switch (action.payload.success) {
                case true:
                    let boulder = action.payload.boulder;
                    let commentIds = [];
                    boulder.comments.forEach((comment) => {
                        commentIds.push(comment._id);
                    })
                    boulder = { ...boulder, comments: commentIds };
                    // convert comments to a list of comment ids first 
                    state.byId = { ...state.byId, [boulder._id]: boulder };
                    state.allIds = [...state.allIds, boulder._id];
                    // state.boulders = [...state.boulders, action.payload.boulder];
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
        [deleteBoulder.pending]: (state) => {
            state.status = "loading";
        },
        [deleteBoulder.fulfilled]: (state, action) => {
            // action payload contains success and boulder that is deleted
            const { boulder } = action.payload;
            let newState = { ...state.byId };
            delete newState[boulder._id];
            state.allIds = state.allIds.filter((id) => id !== boulder._id);
            state.byId = newState;
            // needs to delete comments as well
            // remove the entry in byId by id
            // filter the allIds array of the id
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
                    const { boulder } = action.payload;
                    state.byId = { ...state.byId, [boulder._id]: boulder };
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
        [addComment.pending]: (state, action) => {
            state.status = "loading";
        },
        [addComment.fulfilled]: (state, action) => {
            // getting the boulder from backend
            //      find the boulder in state and push new commentid onto it
            const { boulder, comment } = action.payload;

            // spread the state.byId, but update just the boulder that matches the id from backend, and in that boulder update the comments array
            state.byId = { ...state.byId, [boulder._id]: { ...state.byId[boulder._id], comments: [...state.byId[boulder._id].comments, comment._id] } }
            state.status = "success";
        },
        [addComment.rejected]: (state, action) => {
            state.status = "failed";
        },
        [deleteComment.pending]: (state, action) => {
            state.status = "loading";
        },
        [deleteComment.fulfilled]: (state, action) => {
            // need to find the boulder in state and filter out the one that was deleted
            const { commentId, boulder } = action.payload;

            const foundBoulder = state.byId[boulder._id];
            const comments = foundBoulder.comments.filter((c) => c._id !== commentId);

            state.byId = { ...state.byId, [boulder._id]: { ...state.byId[boulder._id], comments } }
            state.status = "success";
        },
        [deleteComment.rejected]: (state, action) => {
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