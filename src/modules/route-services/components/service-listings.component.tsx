import { Grid } from '@mui/material';
import React from 'react';
import { API } from './../../../abcd-shared/api';
// import { API } from '@sanctuaryteam/shared'
import { AuthSelectors, useServiceSearchQuery } from '@modules/redux/slices';
import { ServiceSelectors } from '@modules/redux/slices';
import { ServiceListing, TAGS } from '../components';
import { useRouteServerType } from '@modules/common/providers';
import { useSelector } from 'react-redux';

export const numberToTags = (numberValue: number): string[] => {
    const selectedTags: string[] = [];

    for (const tag in TAGS) {
        if ((numberValue & TAGS[tag]) !== 0) {
            selectedTags.push(tag.replace("_", " "));
        }
    }
    return selectedTags;
}

export const ServiceListings: React.FC = () => {
    const [serverType] = useRouteServerType();
    const userId = parseInt(useSelector(AuthSelectors.getUser).id, 10);

    const serviceGetSearchQuery: API.ServiceGetSearchQuery = {
        serverType,
        userId,
        deleted: false,
        limit: 3
    };
    
    useServiceSearchQuery(serviceGetSearchQuery);
    const listings = useSelector(ServiceSelectors.getUserListings)

    return (
        <Grid item xs={12} md={12} sx={{}}>
            {/* @ts-ignore */} {/* To disregard error that map does not exist on unknown "listings" */}
            {listings.map(listing =>
                <ServiceListing
                    key={listing.id}
                    user={listing?.user.battleNetTag}
                    id={listing?.id}
                    // lastUpdated={'Today at 9:21 pm'}
                    lastUpdated={new Date(listing?.updatedAt).toLocaleString()}
                    title={listing?.title}
                    content={listing?.content}
                    tags={numberToTags(listing?.tags)}
                />
            )}
        </Grid>
    );
};
