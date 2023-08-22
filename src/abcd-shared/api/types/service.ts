import { Game } from '@diablosnaps/common';

export type ServiceSortDirection = 'asc' | 'desc';

// TODO: discuss
export type ServiceSortField = 'bumpedAt';

export interface ServiceSort {
    field: ServiceSortField;
    direction: ServiceSortDirection;
}

export interface ServiceTitleFilter {
    keywords: string;
}

export interface ServiceTagsFilter {
    tags: number[];
}

// export interface ServiceAuthorFilter {
//     userId?: number;
//     btag?: string;
// }

// export interface ServiceActiveFilter {
//     deleted?: boolean;
// }

export interface ServiceQuery {
    title?: ServiceTitleFilter;
    tags?: ServiceTagsFilter;
    userId?: number;
    deleted?: boolean;
}

export interface ServiceListingAccount {
    name: string;
    online: boolean;
    lastSeenAt: Date;
}

export interface ServiceListing {
    id: string;
    account?: ServiceListingAccount;
    realmType?: string;
    title?: string;
    content?: string;
    userId?: number;
    tags?: number[];
    maxAcceptedSlots?: number;
    updatedAt?: Date;
    deleted?: boolean;
    // TODO: price, bidding info, etc
}

// export interface ServiceSearchPayload {
//     query?: ServiceQuery;
//     sort?: ServiceSort;
// }

export interface ServiceSearchPayload {
    // query?: ServiceQuery;
    // sort?: ServiceSort;
    userId?: number;
    deleted?: boolean;
}

export interface ServiceSearchResult {
    listing: ServiceListing;
}

export interface ServiceGetSearchQuery {
    serverType: Game.ServerType;
    title?: string;
    tags?: number[];
    userId?: number;
    deleted?: number;
    offset?: number;
    limit?: number;
}
export interface ServiceGetSearchResponse {
    results: ServiceSearchResult[];
    hasMore: boolean;
    timestamp: number;
}