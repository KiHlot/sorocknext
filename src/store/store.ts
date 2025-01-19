import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { siteApi } from '@/api/site/site';

const rootReducer = combineReducers({
    [siteApi.reducerPath]: siteApi.reducer,
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat([siteApi.middleware]),
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
