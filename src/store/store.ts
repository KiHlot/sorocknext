import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { adminApi } from '@/api/admin/admin';
import { authApi } from '@/api/auth/auth';
import { calendarApi } from '@/api/calendar/endpoints';
import { jwtApi } from '@/api/jwt/jwt';
import { newsApi } from '@/api/news/endpoints';
import { pageApi } from '@/api/page/page';
import { postApi } from '@/api/post/endpoints';
import { publicationsApi } from '@/api/publications/endpoints';
import { shortsApi } from '@/api/shorts/endpoints';
import { siteApi } from '@/api/site/site';
import { sportApi } from '@/api/sport/endpoints';
import { taxonomyApi } from '@/api/taxonomy/taxonomy';
import { usersApi } from '@/api/users/users';
import { videoApi } from '@/api/video/endpoints';
import { globalDataSlice } from '@/store/slices/globalDataSlice';

const rootReducer = combineReducers({
    [usersApi.reducerPath]: usersApi.reducer,
    [siteApi.reducerPath]: siteApi.reducer,
    [taxonomyApi.reducerPath]: taxonomyApi.reducer,
    [jwtApi.reducerPath]: jwtApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [pageApi.reducerPath]: pageApi.reducer,
    [videoApi.reducerPath]: videoApi.reducer,
    [calendarApi.reducerPath]: calendarApi.reducer,
    [publicationsApi.reducerPath]: publicationsApi.reducer,
    [sportApi.reducerPath]: sportApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [shortsApi.reducerPath]: shortsApi.reducer,
    [globalDataSlice.reducerPath]: globalDataSlice.reducer,
    [postApi.reducerPath]: postApi.reducer,
});

export const makeStore = () =>
    configureStore({
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
                shortsApi.middleware,
                postApi.middleware,
            ]),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
