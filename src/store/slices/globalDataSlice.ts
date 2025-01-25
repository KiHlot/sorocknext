import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    isLeftMenuOpened: boolean;
}

const initialState: InitialState = {
    isLeftMenuOpened: false,
};

export const globalDataSlice = createSlice({
    name: 'globalDataSlice',
    initialState,
    reducers: {
        setIsLeftMenuOpened: (state, action) => {
            state.isLeftMenuOpened = action.payload;
        },
    },
});

export const { setIsLeftMenuOpened } = globalDataSlice.actions;
