import { AuthSelectors } from '../auth';
import { createRootSelector } from '../root.selector';

export const ServiceSelectors = {
    getListings: createRootSelector((state) => state.service.listings),
    getSlots: createRootSelector((state) => state.service.slots),
    getUserListings: createRootSelector((state) => {
        const userId = parseInt(AuthSelectors.getUser(state).id, 10);
        return state.service.listings.filter(listing => listing.userId === userId);
    }),
    getUserSlots: createRootSelector((state) => {
        const userId = AuthSelectors.getUser(state).id;
        const slots = ServiceSelectors.getSlots(state);

        return slots.filter(slot => slot.serviceOwnerUserId === userId);
    }),
};
