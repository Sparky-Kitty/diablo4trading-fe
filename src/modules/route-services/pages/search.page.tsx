import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ServerTypeInput } from '@modules/common/components';
import { Box, Button, Card, Divider, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useRouteServerType } from '../../common/providers';
import { SearchResult, ServiceTags } from '../components';

export const SearchPage: React.FC = () => {
    const [serverType, setServerType] = useRouteServerType();

    const { i18n } = useLingui();

    return (
        <React.Fragment>
            <BrowserView>
                <Card sx={{ p: 2, pt: 0 }}>
                    <Box pt={2}>
                        <Grid container spacing={1} alignItems='center' justifyContent='space-around'>
                            <Grid item xs={12}>
                                <Typography variant='subtitle2' color='text.secondary'>
                                    {t(i18n)`Search Services`}
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id='title-text-search-field'
                                    label='Title'
                                    variant='outlined'
                                    sx={{ pt: 2 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormHelperText sx={{ ml: 35 }}>
                                    {t(i18n)`Tags`}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{t(
                                        i18n,
                                    )`Region`}
                                </FormHelperText>
                                <Box
                                    display='flex'
                                    justifyContent='center'
                                >
                                    <ServiceTags />
                                </Box>
                            </Grid>
                            <Grid item xs={2} sx={{ mt: 2 }}>
                                <ServerTypeInput
                                    value={serverType}
                                    onChange={setServerType}
                                />
                            </Grid>
                            <Grid item xs={1} sx={{ mt: 2 }}>
                                <Button
                                    color='success'
                                    variant='outlined'
                                    sx={{ ml: 1 }}
                                >
                                    {t(i18n)`Search`}
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
            </BrowserView>
            <MobileView>
                <Card sx={{ p: 2, pt: 0 }}>
                    <Box pt={2}>
                        <Grid container spacing={1} alignItems='center' justifyContent='space-between'>
                            <Grid item xs={12}>
                                <Typography variant='subtitle2' color='text.secondary'>
                                    {t(i18n)`Search Services`}
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id='title-text-search-field'
                                    label='Title'
                                    variant='outlined'
                                    sx={{ mt: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormHelperText sx={{ ml: 16 }}>
                                    {t(i18n)`Tags`}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{t(i18n)`Region`}
                                </FormHelperText>
                                <Box
                                    display='flex'
                                    justifyContent='center'
                                >
                                    <ServiceTags />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <ServerTypeInput
                                    value={serverType}
                                    onChange={setServerType}
                                />
                                <Button
                                    color='success'
                                    variant='outlined'
                                    sx={{ ml: 1, mt: 2 }}
                                >
                                    {t(i18n)`Search`}
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
            </MobileView>
        </React.Fragment>
    );
};
