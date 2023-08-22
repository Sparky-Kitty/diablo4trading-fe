import { createRootSelector } from '../root.selector';

export const ServiceSelectors = {
    getTitle: createRootSelector((state) => state.service.title),
    getContent: createRootSelector((state) => state.service.content),
    getTags: createRootSelector((state) => state.service.tags),
    getUserId: createRootSelector((state) => state.service.userId),
    getBumpedAt: createRootSelector((state) => state.service.bumpedAt),
    getDeleted: createRootSelector((state) => state.service.deleted),
};
