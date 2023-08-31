import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Button, Card, Grid, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';

interface ServiceOfferProps {
    slot: API.ServiceSlot;
    buyer: API.AuthUser;
    rating: number;
}

export const ServiceOffer: React.FC<ServiceOfferProps> = ({
    slot,
    buyer,
    rating,
}) => {
    if (slot.state == API.SERVICE_SLOT_STATES.PENDING && buyer.battleNetTag) {
        return (
            <Card sx={{ p: 2, mt: 2, display: 'flex' }}>
                <Grid container columnSpacing={1} sx={{ alignContent: 'center' }}>
                    <Grid item xs={12}>
                        <Typography variant='subtitle2' fontWeight='bold'>
                            {buyer?.battleNetTag.split('#')[0]}, with a rating of {rating}, would like to purchase
                            {slot?.service?.title}.
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ alignSelf: 'flex-start' }}>
                        <Button
                            color='success'
                            variant='outlined'
                            startIcon={<ThumbUpOutlinedIcon />}
                            sx={{ ml: 1 }}
                        >
                        </Button>
                    </Grid>
                    <Grid item xs={6} sx={{ alignSelf: 'flex-end' }}>
                        <Button
                            color='error'
                            variant='outlined'
                            startIcon={<ThumbDownOutlinedIcon />}
                            sx={{ ml: 1 }}
                        >
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        );
    }
};
