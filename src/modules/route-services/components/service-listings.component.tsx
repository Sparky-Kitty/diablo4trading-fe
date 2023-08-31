import { useRouteServerType } from '@modules/common/providers';
import { useSelector } from 'react-redux';
import { ServiceListing } from '../components';
import { Redux } from '@modules/redux';

interface ServiceListingsProps {
    user: API.AuthUser;
}

export const ServiceListings: React.FC<ServiceListingsProps> = ({
    user,
}) => {
    const [serverType] = useRouteServerType();

    const serviceGetSearchQuery: API.ServiceGetSearchQuery = {
        serverType,
        userId: parseInt(user.id, 10),
        deleted: false,
        limit: 3,
    };

    Redux.useServiceSearchQuery(serviceGetSearchQuery);
    const listings: API.ServiceListing[] = useSelector(Redux.ServiceSelectors.getUserListings);

    return (
        <Grid item xs={12} md={12} sx={{}}>
            {listings ? listings.map(listing => (
                    <ServiceListing
                        key={listing?.id}
                        user={user?.battleNetTag}
                        id={listing?.id}
                        lastUpdated={new Date(listing?.updatedAt).toLocaleString()}
                        title={listing?.title}
                        content={listing?.content}
                        tags={API.numberToTags(listing?.tags)}
                    />
                ))
                : <></>}
        </Grid>
    );
};
