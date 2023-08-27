import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, Card, Divider, Typography } from '@mui/material';
import React from 'react';
import { API } from '@sanctuaryteam/shared';
import { ServiceOffer } from '../components';
import { Redux } from '@modules/redux';
import { useSelector } from 'react-redux';

export const ServiceOffers: React.FC = () => {
    const { i18n } = useLingui();

    const serviceSlotGetSearchQuery: API.ServiceSlotGetSearchQuery = {
        ownerId: 1,
        state: API.SERVICE_SLOT_STATES.PENDING,
        limit: 5       
    };

    Redux.useServiceSlotsSearchQuery(serviceSlotGetSearchQuery)
    const slots = useSelector(Redux.ServiceSelectors.getUserSlots);

    return (
        <Card sx={{ p: 2, pt: 0 }}>
            <Box pt={2}>
                <Typography variant='subtitle2' color='text.secondary'>
                    {t(i18n)`Notifications`}
                </Typography>
                <Divider />
                {/* @ts-ignore */} {/* To disregard error that map does not exist on unknown "listings" */}
                {slots ? slots.map(slot => (
                    <ServiceOffer
                        key={slot?.id}
                        rating={4.3}
                        buyer={slot?.client}
                        slot={slot}
                    />
                ))
            : <></>}
            </Box>
        </Card>
    );
};
