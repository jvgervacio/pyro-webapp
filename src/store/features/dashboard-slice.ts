import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import firebase from "@/services/firebase_api";
import { GiFire, GiHistogram, GiMovementSensor, GiRingingAlarm } from 'react-icons/gi'
import { Sensor } from "@/utils/utility_types";
import { MdHistory } from "react-icons/md";
import { set } from 'firebase/database';
import { BsFire } from "react-icons/bs";
const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        indicators: [
            { title: "Triggered Alarms", icon: BsFire, value: 0 },
            { title: "Total Alarms", icon: GiRingingAlarm, value: 0 },
        ] as { title: string, icon: any, value: number }[],
        sensors: new Array<Sensor>(),
        modalShowing: false,
        
    },
    reducers: {
        setSensors(state, action) {
            state.sensors = action.payload;
        },

        setTriggeredAlarms(state, action) {
            state.indicators[0].value = action.payload;
        },
        setTotalAlarms(state, action) {
            state.indicators[1].value = action.payload;
        },

        setModalShowing(state, action) {
            state.modalShowing = action.payload;
        }
    },
});

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice;
