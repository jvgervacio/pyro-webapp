import {configureStore} from '@reduxjs/toolkit';
import authSlice from 'store/features/auth-slice';
import viewstateSlice from 'store/features/viewstate-slice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        track: viewstateSlice.reducer,
    }
});

export default store;
