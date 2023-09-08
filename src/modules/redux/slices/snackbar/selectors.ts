import { createRootSelector } from '../root.selector';

export const SnackbarSelectors = {
    getError: createRootSelector((state) => state.snackbar.error),
    getActive: createRootSelector((state) => state.snackbar.active),
    getMessage: createRootSelector((state) => state.snackbar.message),
    getTimeout: createRootSelector((state) => state.snackbar.timeout),
};
