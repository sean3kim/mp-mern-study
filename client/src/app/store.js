import { configureStore } from "@reduxjs/toolkit";
import boulderReducer from "../features/boulders/bouldersSlice";

export const store = configureStore({
    reducer: {
        boulders: boulderReducer,
    }
});