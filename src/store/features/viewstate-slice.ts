import { createSlice } from "@reduxjs/toolkit";
import { ViewState } from 'react-map-gl';

const viewstateSlice = createSlice({
    name: "viewstate",
    initialState: {
        viewstate: {
            longitude: 125.8094609394992,
            latitude:7.447115401399549,
            zoom: 13,
            pitch: 100,
            bearing: 0,
            padding: {top: 0, bottom: 0, left: 0, right: 0}
        } as ViewState
      },
    reducers: {
        setViewState(state, action) {
            state.viewstate = action.payload;
        }
    }
});

export const viewstateActions = viewstateSlice.actions;
export default viewstateSlice;



