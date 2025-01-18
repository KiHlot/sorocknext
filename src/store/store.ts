import { siteApi } from '@/api/site/site';
import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    [siteApi.reducerPath]: siteApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store: Store<RootState> = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat([siteApi.middleware]),
});
