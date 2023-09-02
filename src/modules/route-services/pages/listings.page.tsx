import { Redux } from '@modules/redux';
import { Grid, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { ServiceCreate, ServiceListings, ServiceOffers } from '../components';

export const ListingsPage: React.FC = () => {
    const user: API.AuthUser = useSelector(Redux.AuthSelectors.getUser) ?? null;

    const handleCreate = () => {
        // setTimeout(() => {
        //     window.location.reload();
        // }, 1500);
        // comment for PR action-testing
    };

    if (!user) {
        return (
            <React.Fragment>
                <Grid container spacing={1}>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography variant='h6' fontWeight='bold' mt='30vh'>
                            Please login to view this page.
                        </Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3} alignContent={'flex-start'}>
                        <ServiceOffers user={user} />
                    </Grid>
                    <Grid item xs={12} md={9} alignContent={'flex-end'}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} alignContent={'center'}>
                                <ServiceCreate
                                    user={user}
                                    onSubmit={handleCreate}
                                    onCancel={handleCreate}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} alignContent={'center'}>
                                <ServiceListings user={user} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
};
