import { createSlice } from "@reduxjs/toolkit";
import {
    fetchAreas,
    fetchOneArea,
    addArea,
    deleteArea
} from "./areasThunks";
import { addBoulder } from "../boulders/bouldersThunks";


export const areasSlice = createSlice({
    name: "areas",
    initialState: {
        areas: [],
        byId: {},
        allIds: [],
        status: null
    },
    reducers: {
    },
    extraReducers: {
        [fetchAreas.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchAreas.fulfilled]: (state, action) => {
            // action.payload.areas = list of areas
            // populated boulders, path, parent
            switch (action.payload.success) {
                case true:
                    const { areas } = action.payload;
                    let newState = {};
                    areas.forEach((area) => {
                        let boulderIds = [];
                        area.boulders.forEach((boulder) => {
                            boulderIds.push(boulder._id);
                        })

                        const areaId = area._id;
                        area = { ...area, boulders: boulderIds };
                        newState[areaId] = area;
                        state.allIds = [...state.allIds, areaId];
                    })
                    // state.areas = [...action.payload.areas];
                    state.byId = newState;
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
                    const { boulders } = action.payload.area;
                    const isFound = state.byId[action.payload.area._id] && true;
                    if (!isFound) {
                        let boulderIds = [];
                        boulders.forEach((boulder) => {
                            boulderIds.push(boulder._id);
                        })
                        const fetched = { ...action.payload.area, boulders: boulderIds };
                        state.byId = { ...state.byId, [state.byId[fetched._id]]: fetched };
                        state.allIds = [...state.allIds, fetched._id];
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
                    // state.areas = [...state.areas, action.payload.area];

                    let { area } = action.payload;
                    const { boulders } = action.payload.area;

                    let boulderIds = [];
                    boulders.forEach((boulder) => boulderIds.push(boulder._id));
                    area = { ...area, boulders: boulderIds };

                    state.byId = { ...state.byId, [area._id]: area };
                    state.allIds = [...state.allIds, area._id];
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
            const { area, descendents } = action.payload;

            // let newState;
            let newState = state.byId;
            // if the area to delete has descendents
            if (action.payload.descendents.length > 0) {
                // delete all sub areas
                descendents.forEach((d) => {
                    delete newState[d._id];
                    state.allIds = state.allIds.filter((id) => id !== d._id)
                })

                // newState = state.areas.filter((area) => {
                //     return (descendents.findIndex((d) => d._id === area._id) === -1)
                // })
                // newState = newState.filter((area) => area._id !== parentArea._id)
            }
            delete newState[area._id];

            state.allIds = state.allIds.filter((id) => id !== area._id);
            state.byId = newState;
            // state.areas = newState;
            state.status = "success";
        },
        [deleteArea.rejected]: (state, action) => {
            state.status = "failed";
        },
        [addBoulder.pending]: (state, action) => {
            state.status = "loading";
        },
        [addBoulder.fulfilled]: (state, action) => {
            // add the boulder id to the boulders list of the area
            const { areaId, boulder } = action.payload;
            let newBouldersList = [...state.byId[areaId].boulders, boulder._id];
            state.byId = { ...state.byId, [areaId]: { ...state.byId[areaId], boulders: newBouldersList } };
            state.status = "success";
        },
        [addBoulder.rejected]: (state, action) => {
            state.status = "failed";
        },
    }
})

export default areasSlice.reducer;