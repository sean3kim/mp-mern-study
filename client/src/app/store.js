import { configureStore } from "@reduxjs/toolkit";
import boulderReducer from "../features/boulders/bouldersSlice";
import userReducer from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
        boulders: boulderReducer,
        users: userReducer
    }
});