import { createRootSelector } from '../root.selector';

// Custom comparison function to sort by the nested date
function orderByUpdatedAt(a, b) {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (dateA < dateB) {
        return -1;
    }
    if (dateA > dateB) {
        return 1;
    }
    return 0;
}

export const AuthSelectors = {
    getToken: createRootSelector((state) => state.auth.token),
    getUser: createRootSelector((state) => state.auth.user),
    getNotifications: createRootSelector((state) => state.auth.notifications.sort(orderByUpdatedAt)),
    // getNotifications: createRootSelector((state) => state.auth.notifications),
    getUserId: createRootSelector((state) => state.auth.user?.id),
};
