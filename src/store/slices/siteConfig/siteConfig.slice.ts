import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SITE_CONFIG_DEFAULT_STATE } from '@/store/slices/siteConfig/siteConfig.config';

export const siteConfig = createSlice({
    name: 'siteConfig',
    initialState: SITE_CONFIG_DEFAULT_STATE,
    reducers: {
        setIsBottomSheetOpen: (state, action: PayloadAction<boolean>) => {
            state.isBottomSheetOpen = action.payload;
        },
        setIsGlobalLoading: (state, action: PayloadAction<boolean>) => {
            state.isGlobalLoading = action.payload;
        },
        pushOverlay: (state, action: PayloadAction<string>) => {
            state.overlayStack = state.overlayStack.filter(
                (id) => id !== action.payload,
            );
            state.overlayStack.push(action.payload);
        },
        popOverlay: (state, action: PayloadAction<string>) => {
            state.overlayStack = state.overlayStack.filter(
                (id) => id !== action.payload,
            );
        },
        clearOverlays: (state) => {
            state.overlayStack = [];
        },
        setIsLeftMenuOpened: (state, action) => {
            state.isLeftMenuOpened = action.payload;
        },
    },
});

export const {
    pushOverlay,
    popOverlay,
    clearOverlays,
    setIsBottomSheetOpen,
    setIsGlobalLoading,
    setIsLeftMenuOpened,
} = siteConfig.actions;
