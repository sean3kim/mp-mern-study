import { createSlice } from "@reduxjs/toolkit";
import { addComment, deleteComment } from "./commentsThunks";
import { fetchBoulders, fetchOneBoulder } from "../boulders/bouldersThunks";

export const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        byId: {},
        allIds: [],
        // comments: [],
        status: null
    },
    reducers: {},
    extraReducers: {
        [fetchBoulders.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchBoulders.fulfilled]: (state, action) => {
            let newState = {};
            action.payload.forEach((boulder) => {
                // grab the comments array and manipulate it so that it is like this
                //      _id: { comment information }
                boulder.comments.forEach((comment) => {
                    const commentId = comment._id;
                    newState[commentId] = comment;
                    state.allIds = [...state.allIds, commentId]
                })
            })
            state.byId = newState;
            state.status = "success";
        },
        [fetchBoulders.rejected]: (state, action) => {
            state.status = "failed";
        },
        [fetchOneBoulder.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchOneBoulder.fulfilled]: (state, action) => {
            const boulderComments = action.payload.boulder.comments;
            // if the comments are already in the state, don't need to add them again
            let newState = { ...state.byId };
            boulderComments.forEach((comment) => {
                if (!(comment._id in newState)) {
                    newState[comment._id] = comment;
                    state.allIds = [...state.allIds, comment._id];
                }
            })
            state.byId = newState;
            state.status = "success";
        },
        [fetchOneBoulder.rejected]: (state, action) => {
            state.status = "failed";
        },
        [addComment.pending]: (state, action) => {
            state.status = "loading";
        },
        [addComment.fulfilled]: (state, action) => {
            const boulderComments = action.payload.boulder.comments;
            // data from backend is coming into action.payload
            //      coming in in the form of just a boulder with populated comment and user
            let newState = { ...state.byId };
            boulderComments.forEach((comment) => {
                newState[comment._id] = comment;
                state.allIds = [...state.allIds, comment._id];
            })
            state.byId = newState;
            state.status = "success";
        },
        [addComment.rejected]: (state, action) => {
            state.status = "failed";
        },
        [deleteComment.pending]: (state, action) => {
            state.status = "loading";
        },
        [deleteComment.fulfilled]: (state, action) => {
            // getting the boulder back without the comment
            //      need to remove entry from byId object
            //      also need to remove from allIds
            //  might need to send the commentId and this will be much easier
            const { commentId } = action.payload;
            const newState = { ...state.byId };
            delete newState[commentId];

            state.byId = newState;
            state.allIds = state.allIds.filter((id) => id !== commentId);
            state.status = "success";
        },
        [deleteComment.rejected]: (state, action) => {
            state.status = "failed";
        },
    }
})

export default commentsSlice.reducer;