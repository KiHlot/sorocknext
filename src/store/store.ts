import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { adminApi } from '@/api/admin/admin';
import { authApi } from '@/api/auth/auth';
import { jwtApi } from '@/api/jwt/jwt';
import { pageApi } from '@/api/page/page';
import { siteApi } from '@/api/site/site';
import { taxonomyApi } from '@/api/taxonomy/taxonomy';
import { usersApi } from '@/api/users/users';
import { globalDataSlice } from '@/store/slices/globalDataSlice';
import { videoApi } from '@/api/video/video';

const rootReducer = combineReducers({
    [usersApi.reducerPath]: usersApi.reducer,
    [siteApi.reducerPath]: siteApi.reducer,
    [taxonomyApi.reducerPath]: taxonomyApi.reducer,
    [globalDataSlice.reducerPath]: globalDataSlice.reducer,
    [jwtApi.reducerPath]: jwtApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [pageApi.reducerPath]: pageApi.reducer,
    [videoApi.reducerPath]: videoApi.reducer,
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat([
                siteApi.middleware,
                taxonomyApi.middleware,
                jwtApi.middleware,
                authApi.middleware,
                usersApi.middleware,
                adminApi.middleware,
                pageApi.middleware,
                videoApi.middleware,
            ]),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
