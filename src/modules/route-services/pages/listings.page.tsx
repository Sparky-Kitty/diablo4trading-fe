import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import { Box, Card, Divider, Grid, Button, ToggleButton, ToggleButtonGroup, Typography, FormHelperText, TextField, Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { ServiceListing, ServiceOffer } from '../components';

const TAGS = {
    POWERLEVELING: 1 << 0,
    BOSS_HELP: 1 << 1,
    UBER_LILITH: 1 << 2,
    CAPSTONE_BOOST: 1 << 3,
    EUROPE: 1 << 4,
    ASIA: 1 << 5,
    AMERICA: 1 << 6,
};

export const ListingsPage: React.FC = () => {
    const [selectedTags, setSelectedTags] = React.useState<number[]>([]);

    const handleTagSelection = (_, newTags: number[]) => {
        setSelectedTags(() => newTags);
    };
    
    const [numOfSlots, setSlotAmount] = React.useState('');
  
    const handleSlotsChange = (event: SelectChangeEvent) => {
        setSlotAmount(event.target.value as string);
    };
    
    const [realm, setRealm] = React.useState('');
  
    const handleRealmChange = (event: SelectChangeEvent) => {
        setRealm(event.target.value as string);
    };

    // const tagsToNumber = React.useMemo(
    //     () =>
    //         selectedTags.reduce(
    //             (previousValue: number, currentValue: number) => previousValue | currentValue,
    //             0
    //         ),
    //     [selectedTags]
    // );

    const { i18n } = useLingui();

    return (
        <React.Fragment>
            <Grid container spacing={1}> 
                <Grid item xs={12} md={3} alignContent={"flex-start"}>

                    <Card sx={{ p: 2, pt: 0 }}>
                        <Box pt={2} sx={{height: '100vh'}}>
                            <Typography variant='subtitle2' color='text.secondary'>
                                {t(i18n)`Notifications`}
                            </Typography>
                            <Divider />
                            <ServiceOffer
                                score={4.3}
                                buyer={'Billybob'}
                                service={'T4 Capstone Dungeon'}
                            />
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={9} alignContent={"flex-end"}>
                    <Card sx={{ p: 2, pt: 0 }}>
                        <Box pt={2} sx={{height: '50vh'}}>
                            <FormControl>
                                
                                <Typography variant='subtitle2' color='text.secondary'>
                                    {t(i18n)`Create New Service`}
                                </Typography>
                                <Divider />

                                <Grid container spacing={1}>
                                    <Grid item xs={9}>
                                        <Select
                                            id="realm-select-field"
                                            value={realm}
                                            label="Realm"
                                            onChange={handleRealmChange}
                                        >
                                            <MenuItem value={'Seasonal'}>Seasonal</MenuItem>
                                            <MenuItem value={'Eternal'}>Eternal</MenuItem>
                                        </Select>
                                        <FormHelperText>Seasonal/Eternal</FormHelperText>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <ToggleButtonGroup
                                            value={selectedTags}
                                            onChange={handleTagSelection}
                                            aria-label={t(i18n)`Service Types`}
                                        >
                                            <ToggleButton value={TAGS.POWERLEVELING}>{t(i18n)`Powerleveling`}</ToggleButton>
                                            <ToggleButton value={TAGS.BOSS_HELP}>{t(i18n)`Boss Help`}</ToggleButton>
                                            <ToggleButton value={TAGS.UBER_LILITH}>{t(i18n)`Uber Lilith`}</ToggleButton>
                                            <ToggleButton value={TAGS.CAPSTONE_BOOST}>{t(i18n)`Capstone Boost`}</ToggleButton>
                                            <ToggleButton value={TAGS.EUROPE}>{t(i18n)`Europe`}</ToggleButton>
                                            <ToggleButton value={TAGS.ASIA}>{t(i18n)`Asia`}</ToggleButton>
                                            <ToggleButton value={TAGS.AMERICA}>{t(i18n)`America`}</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField id="title-text-field" label="Title" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Select
                                            labelId="slot-select-field-label"
                                            id="slot-select-field"
                                            value={numOfSlots}
                                            label="Slots"
                                            onChange={handleSlotsChange}
                                        >
                                            <MenuItem value={1}>One</MenuItem>
                                            <MenuItem value={2}>Two</MenuItem>
                                            <MenuItem value={3}>Three</MenuItem>
                                        </Select>
                                        <FormHelperText># of slots (max 3)</FormHelperText>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField id="content-text-field" label="Content" variant="outlined" multiline rows={5} />
                                    </Grid>
                                    <Grid item xs={3} spacing={1}>
                                        <Button
                                            color='success'
                                            variant='outlined'
                                            startIcon={<PlaylistAddOutlinedIcon />}
                                            sx={{ ml: 1 }}
                                        >
                                            {t(i18n)`Create`}
                                        </Button>
                                        <Button
                                            color='error'
                                            variant='outlined'
                                            startIcon={<RestartAltIcon />}
                                            sx={{ ml: 1 }}
                                        >
                                            {t(i18n)`Clear`}
                                        </Button>
                                    </Grid>

                                </Grid>
                            </FormControl>
                        </Box>
                    </Card>
                    
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <ServiceListing
                                user={'SparkyOnyx'}
                                lastUpdated={'Today at 9:21 pm'}
                                title='T4 Capstone Dungeon'
                                content='Will run 1-3 people through the Fallen Temple dungeon'
                            />
                            <ServiceListing
                                user={''}
                                lastUpdated={''}
                                title=''
                                content=''
                            />
                            <ServiceListing
                                user={''}
                                lastUpdated={''}
                                title=''
                                content=''
                            />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </React.Fragment>
    );
};
