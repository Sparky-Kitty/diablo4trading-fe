// import { t } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';
import React from 'react';
import { ServiceCreate, ServiceListings, ServiceOffers } from '../components';
// import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
// import { BackendSlice  } from './../../redux/slices'

export const ListingsPage: React.FC = () => {
    
    const handleSubmit = () => {
        setTimeout(() => {
            window.location.reload
        }, 1000 * 5);
        
    };
    // const { i18n } = useLingui();
    // const matches = useMediaQuery('(min-width:600px)');

    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3} alignContent={'flex-start'}>
                    <ServiceOffers />
                </Grid>
                <Grid item xs={12} md={9} alignContent={'flex-end'}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} alignContent={'center'}>
                            <ServiceCreate
                            onSubmit={handleSubmit}
                            onCancel={window.location.reload} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} alignContent={'center'}>
                            <ServiceListings />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
