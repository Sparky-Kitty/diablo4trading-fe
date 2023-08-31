import { createSlice } from '@reduxjs/toolkit';
import { API } from '@sanctuaryteam/shared'; // Commented for above reason
import { BackendSlice } from './../backend/slice';

interface ServiceState {
    listings: API.ServiceListing[];
    slots: API.ServiceSlot[];
}

export const SERVICE_STATE_INITIAL: ServiceState = {
    listings: [],
    slots: [],
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
                    state.listings = [];
                    // Now, append any new results that are not already in the listings.
                    action.payload.forEach(result => {
                        if (!state.listings.find(listing => listing.id === result.id)) {
                            state.listings.push(result);
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.serviceSlotsSearch.matchFulfilled,
                (state, action) => {
                    state.slots = [];

                    // Now, append any new results that are not already in the listings.
                    action.payload.forEach(result => {
                        if (!state.slots.find(slot => slot.id === result.id)) {
                            state.slots.push(result);
                        }
                    });
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
                    // action.payload.forEach(result => {
                    //     if (!state.listings.find(listing => listing.id === result.id)) {
                    //         state.listings.push(result);
                    //     }
                    // });
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
                BackendSlice.endpoints.buyService.matchFulfilled,
                (state, action) => {
                    state.listings = state.listings.map(listing => {
                        const updatedResult = action.payload.find(result => result.id === listing.id);
                        return updatedResult ? updatedResult : listing;
                    });
                },
            );
    },
});
