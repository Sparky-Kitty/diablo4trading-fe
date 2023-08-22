// import { API_ENDPOINT } from '@config';
import { Game } from '@diablosnaps/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
// import { API } from './../../../../abcd-shared/api'; // Temporarily for my usage of the correct Payload
// import { API } from '@sanctuaryteam/shared'; // Commented for above reason
// import { AuthSelectors } from '../auth/selectors';
// import { AuthSlice } from '../auth/slice';
// import { RootState } from '../root';

interface ServiceState {
    realmType: Game.ServerType;
    title: string;
    content: string;
    userId: number;
    tags: number;
    bumpedAt: Date;
    deleted: boolean;
}

export const SERVICE_STATE_INITIAL : ServiceState = {
    realmType: Game.ServerType.Seasonal,
    title: '',
    content: '',
    userId: null,
    tags: 0,
    bumpedAt: null,
    deleted: false,
};

export const ServiceSlice = createSlice({
    name: 'service',
    initialState: SERVICE_STATE_INITIAL,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        setContent: (state, action: PayloadAction<string>) => {
            state.content = action.payload
        },
        setTags: (state, action: PayloadAction<number>) => {
            state.tags = action.payload
        },
        setBumpedAt: (state, action: PayloadAction<Date>) => {
            state.bumpedAt = action.payload
        },
        setDeleted: (state, action: PayloadAction<boolean>) => {
            state.deleted = action.payload
        },
    },
});
