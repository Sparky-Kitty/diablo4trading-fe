import { createRootSelector } from '../root.selector';
import { AuthSelectors } from '../auth';

export const ServiceSelectors = {   
    getListings: createRootSelector((state) => state.service.listings),
    getUserListings: createRootSelector((state) => {
        const userId = AuthSelectors.getUser(state).id;
        const listings = ServiceSelectors.getListings(state);

        return listings.filter(listing => listing.userId === userId);
    }),
};
