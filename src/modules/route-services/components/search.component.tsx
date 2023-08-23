import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Redux } from '@modules/redux';
import { Alert, Box, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { API } from '../../../../../shared/src';
import React from 'react';
import { AutoSizer, Index, InfiniteLoader, List, ListRowProps, WindowScroller } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { SearchResult } from './search-result.component';

const Root = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(-0.5),
}));

const PAGE_SIZE = 10;

function createCacheKey(
    serverType: Game.ServerType,
    payload: string,
    timestamp: number,
): string {
    return `${serverType}-${payload}-${timestamp}`;
}

interface SearchResultsProps {
    serializedPayload: string;
    timestamp: number;
    onTimestampChange: (timestamp: number) => void;
}

export const Search: React.FC<SearchResultsProps> = ({
    serializedPayload: payload,
    timestamp,
    onTimestampChange,
}) => {
    const { i18n } = useLingui();

    const [serverType] = Common.useRouteServerType();

    const [cache, setCache] = React.useState<Record<string, API.ServiceGetSearchResponse>>({});
    const [fetch, query] = Redux.useLazyServiceSearchQuery();


    const listRef = React.useRef<List>();

    const rowHeightMap = React.useRef(new Map<number, number>());
    const setRowHeightTimeout = React.useRef<number>();

    const setRowHeight = React.useCallback((index: number, size: number) => {
        if (rowHeightMap.current.get(index) !== size) {
            rowHeightMap.current.set(index, size);
            clearTimeout(setRowHeightTimeout.current);
            setRowHeightTimeout.current = window.setTimeout(() => {
                listRef.current?.recomputeRowHeights();
            }, 1);
        }
    }, []);

    const getRowHeight = React.useCallback(({ index }: Index) => {
        const size = rowHeightMap.current.get(index);
        return size || 560;
    }, []);

    const rowRenderer = React.useCallback(({ index, key, style }: ListRowProps) => {
        const result = results[index];
        return (
            <div key={key} style={style}>
                <Common.Resize
                    onResize={(_, height) => setRowHeight(index, height)}
                    displayBlock
                >
                    {result
                        ? (
                            <SearchResult
                                user={result?.listing?.account?.name}
                                lastUpdated={result?.listing?.lastUpdated.toLocaleDateString()}
                                title={t(i18n)`${result?.listing?.title}`}
                                content={t(i18n)`${result?.listing?.content}`}
                            />
                        )
                        : undefined}
                </Common.Resize>
            </div>
        );
    }, [results, setRowHeight]);

    return (
        <Root>
                {({ registerChild: registerChildLoader, onRowsRendered }) => (
                    <AutoSizer disableHeight>
                        {({ width }) => {
                            const registerList = (instance: List) => {
                                listRef.current = instance;
                                registerChildLoader(instance);
                            };
                            return (
                                <WindowScroller>
                                    {({ height, registerChild, onChildScroll, scrollTop }) => (
                                        <Box ref={registerChild}>
                                            <List
                                                autoHeight
                                                height={height || 0}
                                                width={width}
                                                scrollTop={scrollTop}
                                                onScroll={onChildScroll}
                                                ref={registerList}
                                                onRowsRendered={onRowsRendered}
                                                rowRenderer={rowRenderer}
                                                rowCount={rowCount}
                                                rowHeight={getRowHeight}
                                                estimatedRowSize={560}
                                                overscanCount={0}
                                            />
                                        </Box>
                                    )}
                                </WindowScroller>
                            );
                        }}
                    </AutoSizer>
                )}
            <Snackbar
                open={query.isError}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity='error'>
                    {t(i18n)`Unable to fetch search results.`}
                </Alert>
            </Snackbar>
        </Root>
    );
};
