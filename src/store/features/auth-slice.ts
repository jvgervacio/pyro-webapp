import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import firebase from "@/services/firebase_api";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogged: false,
        user: null as User | null,
    },
    reducers: {
        login(state, action) {
            state.isLogged = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isLogged = false;
            state.user = null;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
