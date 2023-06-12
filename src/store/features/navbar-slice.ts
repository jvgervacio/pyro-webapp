import { createSlice } from "@reduxjs/toolkit";

const navmenuSlice = createSlice({
    name: "navmenu",
    initialState: {
        isShowing: false,
    },
    reducers: {
        toggle(state) {

            state.isShowing = !state.isShowing;

        }
    },
});

export const navmenuActions = navmenuSlice.actions;
export default navmenuSlice;
