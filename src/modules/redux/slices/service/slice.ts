import { createSlice } from '@reduxjs/toolkit';
import { API } from '@sanctuaryteam/shared'; // Commented for above reason
import { BackendSlice } from './../backend/slice';
import { SnackbarSlice } from '../snackbar/slice';

interface ServiceState {
    listings: API.ServiceListing[];
}

export const SERVICE_STATE_INITIAL: ServiceState = {
    listings: [],
};

export const ServiceSlice = createSlice({
    name: 'service',
    initialState: SERVICE_STATE_INITIAL,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                BackendSlice.endpoints.serviceSearch.matchFulfilled,
                (state, action) => {
                    state.listings = state.listings.map(listing => {
                        const updatedResult = action.payload.find(result => result.id === listing.id);
                        return updatedResult ? updatedResult : listing;
                    });

                    // Now, append any new results that are not already in the listings.
                    action.payload.forEach(result => {
                        if (!state.listings.find(listing => listing.id === result.id)) {
                            state.listings.push(result);
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.serviceSearch.matchRejected,
                (_, action) => {
                    if (action.error) {
                        const error = action.error;
                        SnackbarSlice.actions.setError(true);
                        SnackbarSlice.actions.setMessage(error.message);
                        SnackbarSlice.actions.setActive(true);
                        
                        const timeout = window.setTimeout(() => {
                            SnackbarSlice.actions.setError(false);
                            SnackbarSlice.actions.setMessage(null);
                            SnackbarSlice.actions.setActive(false);
                        }, 1000 * 5);
                        
                        window.clearTimeout(timeout);
                    }
                },
            )
            .addMatcher(
                BackendSlice.endpoints.createService.matchFulfilled,
                (state, action) => {
                    state.listings = state.listings.map(listing => {
                        const updatedResult = action.payload.find(result => result.id === listing.id);
                        return updatedResult ? updatedResult : listing;
                    });

                    // Now, append any new results that are not already in the listings.
                    action.payload.forEach(result => {
                        if (!state.listings.find(listing => listing.id === result.id)) {
                            state.listings.push(result);
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.bumpService.matchFulfilled,
                (state, action) => {
                    state.listings = state.listings.map(listing => {
                        const updatedResult = action.payload.find(result => result.id === listing.id);
                        return updatedResult ? updatedResult : listing;
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.bumpService.matchRejected,
                (state, action) => {
                    console.log(action.payload.data.message)
                    try {
                        SnackbarSlice.actions.setError(true);
                        
                    } catch (error) {
                        console.log(JSON.stringify(error))
                        
                    }
                }
            )
            .addMatcher(
                BackendSlice.endpoints.buyService.matchFulfilled,
                (state, action) => {
                    state.listings = state.listings.map(listing => {
                        const updatedResult = action.payload.find(result => result.id === listing.id);
                        return updatedResult ? updatedResult : listing;
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.buyService.matchRejected,
                (_, action) => {
                    if (action.error) {
                        const error = action.error;
                        SnackbarSlice.actions.setError(true);
                        SnackbarSlice.actions.setMessage(error.message);
                        SnackbarSlice.actions.setActive(true);
                        
                        const timeout = window.setTimeout(() => {
                            SnackbarSlice.actions.setError(false);
                            SnackbarSlice.actions.setMessage(null);
                            SnackbarSlice.actions.setActive(false);
                        }, 1000 * 5);
                        
                        window.clearTimeout(timeout);
                    }
                },
            )
            .addMatcher(
                BackendSlice.endpoints.softDeleteService.matchFulfilled,
                (state, action) => {
                    state.listings = state.listings.map((listing, index) => {
                        const updatedResult = action.payload.find(result => result.id === listing.id);
                        // Check if the listing has been deleted by the request.
                        if (listing.deleted === true) {
                            // Remove the listing from the store.
                            return state.listings.splice(index, 1);
                        } else {
                            return updatedResult ? updatedResult : listing;
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.softDeleteService.matchRejected,
                (_, action) => {
                    if (action.error) {
                        const error = action.error;
                        SnackbarSlice.actions.setError(true);
                        SnackbarSlice.actions.setMessage(error.message);
                        SnackbarSlice.actions.setActive(true);
                        
                        const timeout = window.setTimeout(() => {
                            SnackbarSlice.actions.setError(false);
                            SnackbarSlice.actions.setMessage(null);
                            SnackbarSlice.actions.setActive(false);
                        }, 1000 * 5);
                        
                        window.clearTimeout(timeout);
                    }
                },
            );
    },
});


export default ServiceSlice.reducer;
