// import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { useStore } from 'react-redux';

interface SnackbarState {
    error: boolean;
    active: boolean;
    message: string;
    timeout: number;
}

export const SNACKBAR_STATE_INITIAL: SnackbarState = {
    error: true,
    active: false,
    message: null,
    timeout: null,
};

interface ErrorMessage {
    data: {
        message: string;
    }
};

export type RejectedAction = PayloadAction<ErrorMessage>;

const isRejectedAction = (action: AnyAction): action is RejectedAction => {
    // console.log(action)
    return action.type.endsWith('/rejected') && 
           !!action?.payload?.data?.message && typeof action?.payload?.data?.message === 'string';
};

// export const handleErrorWithSnackbar = createAsyncThunk(
//     'snackbar/handleError',
//     async (_, { dispatch, getState }) => {
//       const state = getState();
//       // If there's an existing timeout, clear it
//       if (state.timeout) {
//         window.clearTimeout(state.timeout);
//       }
//       // Set a new timeout to dispatch Snackbar.setState after 5 seconds
//       const timeout = window.setTimeout(() => {
//         dispatch(SnackbarSlice.setState({ message: null, active: false }));
//       }, 1000 * 5);
//       // Return the timeout so you can store it in your state if needed
//       return timeout;
//     }
//   );

export const SnackbarSlice = createSlice({
    name: 'snackbar',
    initialState: SNACKBAR_STATE_INITIAL,
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
        setTimeout: (state, action: PayloadAction<number>) => {
            state.timeout = action.payload;
        },
    },  
    extraReducers: builder => {
        builder
            .addMatcher(
                // Error Handling
                isRejectedAction,
                (state, action: RejectedAction) => {
                    // const store = useStore();
                    state.message = action?.payload.data.message;
                    state.active = true;

                    // if (state.timeout) {
                    //     window.clearTimeout(state.timeout);
                    // }
                    
                    // state.timeout = window.setTimeout(() => {  
                    //     console.log('here')                      
                    //     store.dispatch(SnackbarSlice.actions.setMessage(null));
                    //     store.dispatch(SnackbarSlice.actions.setActive(false));
                    //     store.dispatch(SnackbarSlice.actions.setTimeout(null));
                    // }, 1000 * 5);
                      
                },
            )
    }
});


export default SnackbarSlice.reducer

