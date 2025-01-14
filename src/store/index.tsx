import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { userReducer } from "@/store/reducers/user";
import { navigationReducer } from "@/store/reducers/navigation";
import { pageInfoReducer } from "@/store/reducers/pageInfo";
import { popupsReducer } from "@/store/reducers/popups";
import { exceptionsReducer } from "@/store/reducers/exceptions";
import { profileInfoReducer } from "@/store/reducers/profileInfo";

// creating store
export const createStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      navigation: navigationReducer,
      pageInfo: pageInfoReducer,
      popups: popupsReducer,
      exceptions: exceptionsReducer,
      profileInfo: profileInfoReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== "production",
  });

type ConfiguredStore = ReturnType<typeof createStore>;
type StoreGetState = ConfiguredStore["getState"];
export type RootState = ReturnType<StoreGetState>;
export type AppDispatch = ConfiguredStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
