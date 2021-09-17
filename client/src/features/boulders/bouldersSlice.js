import { createSlice } from "@reduxjs/toolkit";
import { deleteArea } from "../areas/areasThunks";
import {
    fetchBoulders,
    fetchOneBoulder,
    addBoulder,
    addCommentToBoulder,
    deleteBoulder,
    deleteCommentFromBoulder,
    editBoulder,
    searchBoulderName
} from "./bouldersThunks";
import { addComment, deleteComment } from "../comments/commentsThunks";


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
            const newState = action.payload.map((boulder) => {
                let commentIds = [];
                boulder.comments.forEach((comment) => {
                    commentIds.push(comment._id)
                })
                return { ...boulder, comments: commentIds }
            })
            console.log("newState", newState)
            state.boulders = newState;
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
        [addComment.pending]: (state, action) => {
            state.status = "loading";
        },
        [addComment.fulfilled]: (state, action) => {
            // getting the boulder from backend
            //      find the boulder in state and push new commentid onto it
            const newState = state.boulders.map((boulder) => {
                if (boulder._id === action.payload.boulder._id) {
                    boulder.comments.push(action.payload.commentId);
                }
                return boulder;
            })
            state.boulders = newState;
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

            state.boulders = state.boulders.map((b) => {
                if (b._id === boulder._id) {
                    const filteredComments = b.comments.filter((c) => c._id === commentId);
                    b.comments = filteredComments;
                }
                return b;
            })

            state.status = "success";
        },
        [deleteComment.rejected]: (state, action) => {
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
                        let commentIds = [];
                        action.payload.boulder.comments.forEach((comment) => {
                            commentIds.push(comment._id);
                        })
                        state.boulders = [...state.boulders, { ...action.payload.boulder, comments: commentIds }]
                        // state.boulders = [...state.boulders, action.payload.boulder]
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