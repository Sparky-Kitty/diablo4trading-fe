import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SnackbarState {
    error: boolean;
    active: boolean;
    message: string;
}

export const SNACKBAR_STATE_INITAL: SnackbarState = {
    error: false,
    active: false,
    message: '',
};

export const SnackbarSlice = createSlice({
    name: 'snackbar',
    initialState: SNACKBAR_STATE_INITAL,
    reducers: {
        setError: (state, action: PayloadAction<boolean>) => {
            state.error = action.payload;
        },
        setActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        },
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
    }
});


export default SnackbarSlice.actions

