import {configureStore} from '@reduxjs/toolkit';
import authSlice from '@store/features/auth-slice';
import mapSlice from '@store/features/map-slice';
import navmenuSlice from './features/navbar-slice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        map: mapSlice.reducer,
        nav: navmenuSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
