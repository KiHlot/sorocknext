import {
    combineReducers,
    configureStore,
    EnhancedStore,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { siteConfig } from '@/store/slices/siteConfig/siteConfig.slice';
import { archiveApi } from '@/api/archive/archive';
import { authApi } from '@/api/auth/auth';
import { jwtApi } from '@/api/jwt/jwt';
import { siteApi } from '@/api/site/site';
import { taxonomyApi } from '@/api/taxonomy/taxonomy';
import { usersApi } from '@/api/users/users';

const rootReducer = combineReducers({
    [archiveApi.reducerPath]: archiveApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [siteApi.reducerPath]: siteApi.reducer,
    [taxonomyApi.reducerPath]: taxonomyApi.reducer,
    [jwtApi.reducerPath]: jwtApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [siteConfig.reducerPath]: siteConfig.reducer,
});

export const makeStore = (): EnhancedStore<RootState> =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([
                siteApi.middleware,
                taxonomyApi.middleware,
                jwtApi.middleware,
                authApi.middleware,
                archiveApi.middleware,
                usersApi.middleware,
            ]),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => ReturnType<typeof useDispatch> = () =>
    useDispatch();
