import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Redux } from '@modules/redux';
import { Box, Card, Divider, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { ServiceOffer } from '../components';

interface ServiceOffersProps {
    user: API.AuthUser;
}

export const ServiceOffers: React.FC<ServiceOffersProps> = ({
    user,
}) => {
    const { i18n } = useLingui();

    const serviceSlotGetSearchQuery: API.ServiceSlotGetSearchQuery = {
        ownerId: parseInt(user.id),
        state: API.SERVICE_SLOT_STATES.PENDING,
        limit: 5,
    };

    Redux.useServiceSlotsSearchQuery(serviceSlotGetSearchQuery);
    const slots: API.ServiceSlot[] = useSelector(Redux.ServiceSelectors.getUserSlots);

    return (
        <Card sx={{ p: 2, pt: 0 }}>
            <Box pt={2}>
                <Typography variant='subtitle2' color='text.secondary'>
                    {t(i18n)`Notifications`}
                </Typography>
                <Divider />
                {slots
                    ? slots.map(slot => (
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
