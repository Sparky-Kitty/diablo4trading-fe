import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
    Grid,
} from '@mui/material';
import React from 'react';
import { ServiceListing } from '../components';

export const ServiceListings: React.FC = () => {
    const { i18n } = useLingui();

    return (
        <Grid item xs={12}>
            <ServiceListing // TODO: Replace with pulled data once understood.
                user={'SparkyOnyx#1187'}
                lastUpdated={'Today at 9:21 pm'}
                title={t(i18n)`T4 Capstone Dungeon`}
                content={t(i18n)`Will run 1-3 people through the Fallen Temple dungeon`}
            />
            <ServiceListing
                user={''}
                lastUpdated={''}
                title=''
                content=''
            />
            <ServiceListing
                user={''}
                lastUpdated={''}
                title=''
                content=''
            />
        </Grid>
    );
};
