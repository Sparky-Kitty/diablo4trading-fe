import { Grid } from '@mui/material';
import React from 'react';
import { API } from '@sanctuaryteam/shared'
import { useRouteServerType } from '@modules/common/providers';
import { useSelector } from 'react-redux';
import { ServiceListing } from '../components';
import { Redux } from '@modules/redux';

export const ServiceListings: React.FC = () => {
    const [serverType] = useRouteServerType();
    const userId = useSelector(Redux.AuthSelectors.getUser) ?? null;

    const serviceGetSearchQuery: API.ServiceGetSearchQuery = {
        serverType,
        userId: parseInt(userId?.id) ?? null,
        deleted: false,
        limit: 3,
    };

    Redux.useServiceSearchQuery(serviceGetSearchQuery);
    const listings = useSelector(Redux.ServiceSelectors.getUserListings);

    return (
        <Grid item xs={12} md={12} sx={{}}>
            {/* @ts-ignore */} {/* To disregard error that map does not exist on unknown "listings" */}
            {listings ? listings.map(listing => (
                    <ServiceListing
                        key={listing?.id}
                        user={listing?.user.battleNetTag}
                        id={listing?.id}
                        // lastUpdated={'Today at 9:21 pm'}
                        lastUpdated={new Date(listing?.updatedAt).toLocaleString()}
                        title={listing?.title}
                        content={listing?.content}
                        tags={API.numberToTags(listing?.tags)}
                    />
                ))
                : <></>}
        </Grid>
    );
};
