import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API } from './../../../abcd-shared/api';
// import { API } from '@sanctuaryteam/shared'
import { useLazyServiceSearchQuery } from '@modules/redux/slices';
import { ServiceListing } from '../components';
import { useRouteServerType } from '@modules/common/providers';

export const ServiceListings: React.FC = () => {
    const [serverType] = useRouteServerType();
    const [searchServices] = useLazyServiceSearchQuery();   
    const [service1, setService1] = useState<API.ServiceSearchResult>(null);
    const [service2, setService2] = useState<API.ServiceSearchResult>(null);
    const [service3, setService3] = useState<API.ServiceSearchResult>(null);

    const serviceGetSearchQuery: API.ServiceGetSearchQuery = {
        serverType: serverType,
        userId: 1,
        deleted: 0,
        limit: 3
    };

    useEffect(() => {
        async function fetchData() {
            try {
                // console.log("Payload: " + JSON.stringify(serviceSearchPayload))
                const response = await searchServices(serviceGetSearchQuery);
                if (response.data[0]) {
                    setService1({listing: response.data[0]})
                }
                if (response.data[1]) {
                    setService2({listing: response.data[1]})
                }
                if (response.data[2]) {
                    setService3({listing: response.data[2]})
                } 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <Grid item xs={12} md={12} sx={{}}>
            <ServiceListing
                user={'SparkyOnyx#1187'} // TODO: Replace with pulled account data once understood.
                id={service1?.listing?.id}
                // lastUpdated={'Today at 9:21 pm'}
                lastUpdated={new Date(service1?.listing?.updatedAt).toLocaleString()}
                title={service1?.listing?.title}
                content={service1?.listing?.content}
            />
            <ServiceListing
                user={'SparkyOnyx#1187'}
                id={service2?.listing?.id}
                // lastUpdated={'Today at 9:21 pm'}
                lastUpdated={new Date(service2?.listing?.updatedAt).toLocaleString()}
                title={service2?.listing?.title}
                content={service2?.listing?.content}
            />
            <ServiceListing
                user={'SparkyOnyx#1187'}
                id={service3?.listing?.id}
                // lastUpdated={'Today at 9:21 pm'}
                lastUpdated={new Date(service3?.listing?.updatedAt).toLocaleString()}
                title={service3?.listing?.title}
                content={service3?.listing?.content}
            />
        </Grid>
    );
};
