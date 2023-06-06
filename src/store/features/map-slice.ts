import { Establishment } from "@/utils/utility_types";
import { createSlice } from "@reduxjs/toolkit";
import { ViewState } from 'react-map-gl';

const mapSlice = createSlice({
    name: "map",
    initialState: {
        viewstate: {
            longitude: 125.8094609394992,
            latitude:7.447115401399549,
            zoom: 13,
            pitch: 100,
            bearing: 0,
            padding: {top: 0, bottom: 0, left: 0, right: 0}
        } as ViewState,
        establishments: [] as Establishment[],
      },
    reducers: {
        setViewState(state, action) {
            state.viewstate = action.payload;
        },
        setEstablishments(state, action) {
            state.establishments = action.payload;
        }
    }
});

export const mapSliceActions = mapSlice.actions;
export default mapSlice;



