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
                    state.listings = state.listings.map(listing => {
                        const updatedResult = action.payload.find(result => result.id === listing.id);
                        return updatedResult ? updatedResult : listing;
                    });

                    action.payload.forEach(result => {
                        if (!state.listings.find(listing => listing.id === result.id)) {
                            state.listings.push(result);
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.createService.matchFulfilled,
                (state, action) => {
                    state.listings.push(action.payload);
                },
            )
            .addMatcher(
                BackendSlice.endpoints.bumpService.matchFulfilled,
                (state, action) => {
                    const { id: serviceId } = action.meta.arg.originalArgs;
                    state.listings.map((listing, index) => {
                        if (listing.id === serviceId) {
                            return state.listings[index].updatedAt = new Date().toISOString();
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.softDeleteService.matchFulfilled,
                (state, action) => {
                    const { id: serviceId } = action.meta.arg.originalArgs;
                    state.listings.map((listing, index) => {
                        if (listing.id === serviceId) {
                            return state.listings.splice(index, 1);
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.buyService.matchFulfilled,
                (state, action) => {
                    state.slots.push(action.payload);
                },
            )
            .addMatcher(
                BackendSlice.endpoints.editSlotState.matchFulfilled,
                (state, action) => {
                    const { id: slotId, state: newState } = action.meta.arg.originalArgs;
                    state.slots.map((slot, index) => {
                        if (slot.id === slotId) {
                            return state.slots[index].state = newState;
                        }
                    })
                },
            )
            .addMatcher(
                BackendSlice.endpoints.serviceSlotSearch.matchFulfilled,
                (state, action) => {
                    state.slots = state.slots.map(slot => {
                        const updatedResult = action.payload.find(result => result.id === slot.id);
                        return updatedResult ? updatedResult : slot;
                    });

                    action.payload.forEach(result => {
                        if (!state.slots.find(slot => slot.id === result.id)) {
                            state.slots.push(result);
                        }
                    });
                },
            )
    },
});

export default ServiceSlice.reducer;
