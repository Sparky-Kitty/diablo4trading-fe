import { Game } from '@diablosnaps/common';
import { AuthUser } from './'

export interface ServiceListing {
    id: string;
    realmType?: string;
    title?: string;
    content?: string;
    user?: AuthUser;
    userId?: number;
    tags?: number;
    maxAcceptedSlots?: number;
    updatedAt?: Date;
    deleted?: boolean;
}

export interface ServiceGetSearchQuery {
    serverType: Game.ServerType;
    title?: string;
    tags?: number;
    userId?: number;
    deleted?: boolean;
    offset?: number;
    limit?: number;
}

export type ServiceGetSearchResponse = ServiceListing[]