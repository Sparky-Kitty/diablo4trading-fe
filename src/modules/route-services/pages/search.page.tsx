import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ServerTypeInput } from '@modules/common/components';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestoreIcon from '@mui/icons-material/Restore';
import { Box, Button, Card, Collapse, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
// import { API } from './../../../../../shared/src';
import { API } from '@sanctuaryteam/shared'
import { useSearchParams } from 'react-router-dom';
// import { useRouteServerType } from '../../common/providers';
import { SearchFilter, Search, SearchResult, ServiceTags } from '../components';
import { ServiceTitleInput } from '../components/inputs';
import { useRouteServerType } from '@modules/common/providers';
// import { ServiceTitleInput } from '../components/inputs';

const PARAM_PAYLOAD = 'p';

export const SearchPage: React.FC = () => {
    const [serverType, setServerType] = useRouteServerType();

    const [visible, setVisible] = React.useState<boolean>(true);
    const { i18n } = useLingui();
    const [params, setParams] = useSearchParams();

    const [serviceTitle, setServiceTitle] = React.useState('');
    const handleServiceTitleChange = (value: string) => {
        setServiceTitle(() => value);
    };

    const [selectedTags, setSelectedTags] = React.useState<number[]>([]);

    const handleTagsSelection = (newTags: number[]) => {
        setSelectedTags(newTags);
    };
    
    const serializedPayload = params.get(PARAM_PAYLOAD);
    // const payload = React.useMemo(() => {
    //     return API.deserializeServiceSearchPayload(serializedPayload);
    // }, [serializedPayload]);

    const [timestamp, setTimestamp] = React.useState<number>(undefined);

    // const handleSearch = (payload: API.ServiceSearchPayload) => {
    //     // Reset timestamp to force re-render
    //     setTimestamp(undefined);
    //     setParams({
    //         [PARAM_PAYLOAD]: API.serializeServiceSearchPayload(payload),
    //     });
    // };

    return (
        <React.Fragment>            
            {/* <SearchFilter // TODO: Implement this mostly working setup for using shared interfaces.
                payload={payload}
                onSearch={handleSearch}
            />
            {serializedPayload?.length > 0 && (
                <Search
                    serializedPayload={serializedPayload}
                    timestamp={timestamp}
                    onTimestampChange={setTimestamp}
                />
            )} */}

            <Card sx={{ p: 2, pt: 0 }}>
                <Collapse in={visible}>
                    <Box pt={2}>
                        <Grid container spacing={1} alignItems='center' justifyContent='space-around'>
                            <Grid item xs={12} md={4}>
                                <Typography variant='subtitle2' color='text.secondary'>
                                    {t(i18n)`Service Title`}
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={5.6} md={3.6}>
                                <Typography variant='subtitle2' color='text.secondary'>
                                    {t(i18n)`Service Tags`}
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={6.4} md={4.4}>
                                <Typography variant='subtitle2' color='text.secondary'>
                                    {t(i18n)`Service Region`}
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={4}>
                                <ServiceTitleInput
                                value={serviceTitle}
                                label={t(i18n)`Keyword`}
                                onChange={handleServiceTitleChange} />
                            </Grid>
                            <Grid item xs={8}>
                                <Box
                                    display='flex'
                                    justifyContent='flex-start'
                                >
                                    <ServiceTags selectedTags={selectedTags} onSelectTags={handleTagsSelection} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Collapse>
                <Box pt={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={3}>
                            <ServerTypeInput
                                value={serverType}
                                onChange={setServerType}
                            />
                        </Grid>
                        <Grid md={1} item sx={{ display: { xs: 'none', md: 'block' } }} />
                        <Grid item xs={12} sm={12} md={4}>
                            <Button
                                variant='outlined'
                                fullWidth
                                // onClick={handleSubmit}
                            >
                                {t(i18n)`Search`}
                            </Button>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            display='flex'
                            justifyContent='flex-end'
                            sx={(theme) => ({
                                [theme.breakpoints.down('sm')]: {
                                    justifyContent: 'space-between',
                                },
                            })}
                            gap={1}
                        >
                            <Button
                                variant='outlined'
                                // onClick={handleClear}
                                startIcon={<RestoreIcon />}
                            >
                                {t(i18n)`Clear`}
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                onClick={() => setVisible(!visible)}
                                endIcon={visible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                {visible ? t(i18n)`Hide Filters` : t(i18n)`Show Filters`}
                            </Button>
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
