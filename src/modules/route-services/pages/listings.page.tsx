import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';
import React from 'react';
import { ServiceCreate, ServiceListings, ServiceOffers } from '../components';

export const ListingsPage: React.FC = () => {
    const { i18n } = useLingui();

    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3} alignContent={'flex-start'}>
                    <ServiceOffers />
                </Grid>
                <Grid item xs={12} md={9} alignContent={'flex-end'}>
                    <ServiceCreate />

                    <Grid container spacing={1}>
                        <ServiceListings />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
