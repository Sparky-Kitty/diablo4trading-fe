import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { AuthSelectors, ServiceSelectors, useServiceSlotSearchQuery } from '@modules/redux/slices';
import { Box, Card, Divider, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { ServiceOffer } from './service-notification.component';

export const ServiceOffers: React.FC = () => {
    const { i18n } = useLingui();
    const serviceSlotGetSearchQuery: API.ServiceSlotGetSearchQuery = {
        ownerId: parseInt(useSelector(AuthSelectors.getUserId), 10),
    };

    useServiceSlotSearchQuery(serviceSlotGetSearchQuery);
    const slots = useSelector(ServiceSelectors.getUserSlots);

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
                            slot={slot}
                            service={slot?.service}
                            score={4.3}
                            buyer={slot?.client?.battleNetTag}
                        />
                    ))
                    : <></>}
            </Box>
        </Card>
    );
};
