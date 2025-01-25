import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { globalDataSlice } from '@/store/slices/globalDataSlice';
import { siteApi } from '@/api/site/site';

const rootReducer = combineReducers({
    [siteApi.reducerPath]: siteApi.reducer,
    [globalDataSlice.reducerPath]: globalDataSlice.reducer,
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat([siteApi.middleware]),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
