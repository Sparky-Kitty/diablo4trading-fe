import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Redux } from '@modules/redux';
import { Alert, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import 'react-virtualized/styles.css';
import { ServiceGetSearchQuery } from '../../../abcd-shared/api/types';
import { ServiceListing, numberToTags } from '.';
import { ServiceSelectors } from '@modules/redux/slices';
import { useSelector } from 'react-redux';

const Root = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(-0.5),
}));

interface SearchResultsProps {
    params: ServiceGetSearchQuery
}

export const Search: React.FC<SearchResultsProps> = ({
    params
}) => {
    const { i18n } = useLingui();

    const { data, isLoading, isError, error, currentData } = Redux.useServiceSearchQuery(params);
    const listings = useSelector(ServiceSelectors.getListings)


    return (
        <Root>
            {/* @ts-ignore */} {/* To disregard error that map does not exist on unknown "listings" */}
            {listings.map(listing => // This breaks with an error about data being undefined.
            <ServiceListing 
                key={listing?.id}
                user={listing?.user?.battleNetTag}
                id={listing?.id}
                lastUpdated={new Date(listing?.updatedAt).toLocaleString()}
                title={listing?.title}
                content={listing?.content}
                tags={numberToTags(listing?.tags)}
            ></ServiceListing>)
            }
            <Snackbar
                open={isError}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity='error'>
                    {t(i18n)`Unable to fetch search results.`}
                </Alert>
            </Snackbar>
        </Root>
    );
};