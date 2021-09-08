import { configureStore } from "@reduxjs/toolkit";
import boulderReducer from "../features/boulders/bouldersSlice";
import userReducer from "../features/users/usersSlice";
import areaReducer from "../features/areas/areasSlice";

export const store = configureStore({
    reducer: {
        boulders: boulderReducer,
        users: userReducer,
        areas: areaReducer
    }
});