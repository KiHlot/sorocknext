import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { adminApi } from '@/api/admin/admin';
import { authApi } from '@/api/auth/auth';
import { jwtApi } from '@/api/jwt/jwt';
import { pageApi } from '@/api/page/page';
import { siteApi } from '@/api/site/site';
import { taxonomyApi } from '@/api/taxonomy/taxonomy';
import { usersApi } from '@/api/users/users';
import { globalDataSlice } from '@/store/slices/globalDataSlice';
import { videoApi } from '@/api/video/endpoints';
import { calendarApi } from '@/api/calendar/endpoints';
import { publicationsApi } from '@/api/publications/endpoints';
import { sportApi } from '@/api/sport/endpoints';
import { newsApi } from '@/api/news/endpoints';

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
    [calendarApi.reducerPath]: calendarApi.reducer,
    [publicationsApi.reducerPath]: publicationsApi.reducer,
    [sportApi.reducerPath]: sportApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
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
                calendarApi.middleware,
                publicationsApi.middleware,
                sportApi.middleware,
                newsApi.middleware,
            ]),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
