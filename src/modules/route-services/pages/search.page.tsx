import React from 'react';
import { Search, SearchFilter } from '../components';
import { ServiceGetSearchQuery } from '../../../abcd-shared/api/types';

export const SearchPage: React.FC = () => {
    const [params, setParams] = React.useState<ServiceGetSearchQuery>(null);

    return (
        <React.Fragment>            
            <SearchFilter // TODO: Implement this mostly working setup for using shared interfaces.
                onSearch={setParams}
            />
            {params ? <Search params={params} /> : <></>}
        </React.Fragment>
    );
};