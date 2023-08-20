// import { t } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';
import React from 'react';
import { ServiceCreate, ServiceListings, ServiceOffers } from '../components';

export const ListingsPage: React.FC = () => {
    
    const handleSubmit = () => {
        setTimeout(() => {
            window.location.reload
        }, 1000 * 5);
        
    };

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
