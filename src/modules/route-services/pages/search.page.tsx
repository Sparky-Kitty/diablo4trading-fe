import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { SearchResult, ServiceTags } from '../components';
import { ServerTypeInput } from '@modules/common/components';
import { useRouteServerType } from '../../common/providers';

export const SearchPage: React.FC = () => {

    // const tagsToNumber = React.useMemo(
    //     () =>
    //         selectedTags.reduce(
    //             (previousValue: number, currentValue: number) => previousValue | currentValue,
    //             0
    //         ),
    //     [selectedTags]
    // );

    const [serverType, setServerType] = useRouteServerType();

    const { i18n } = useLingui();

    return (
        <React.Fragment>
            <Card sx={{ p: 2, pt: 0 }}>
                <Box pt={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant='subtitle2' color='text.secondary'>
                                {t(i18n)`Services`}
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={9}>
                            <ServiceTags />
                        </Grid>
                        <Grid item xs={3}>
                            <ServerTypeInput
                                value={serverType}
                                onChange={setServerType}                                            
                            />                            
                        </Grid>
                    </Grid>
                </Box>
            </Card>
            <SearchResult
                user={'JohnDoe#1234'}
                lastUpdated={'Today at 10:30 am'}
                title='⭐WTS⭐T100NM /⭐10mil/5runs ⭐Glyph XP⭐Full Clear-Can Loot⭐'
                content='-Highest Tier NM drop highest quality item with chance Uber Uber Unique, more glyph exp
-Kill everything easy for you to follow and loot. Sell when full
-Cool Lvling with T100, sure you will find upgrade after runs
-Drop your btag and chill with me '
            />
        </React.Fragment>
    );
};
