import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
    Box,
    Button,
    Card,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';
import React from 'react';
import { ServerTypeInput } from '../../common/components';
import { useRouteServerType } from '../../common/providers';
import { ServiceTags } from '../components';

export const ServiceCreate: React.FC = () => {
    const [numOfSlots, setSlotAmount] = React.useState('1');

    const handleSlotsChange = (event: SelectChangeEvent) => {
        setSlotAmount(event.target.value as string);
    };

    const [serverType, setServerType] = useRouteServerType();

    const { i18n } = useLingui();
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <Card sx={{ p: 2, pt: 0 }}>
            <Box pt={2}>
                <FormControl>
                    <Typography variant='subtitle2' color='text.secondary'>
                        {t(i18n)`Create New Service`}
                    </Typography>
                    <Divider />

                    <Grid container spacing={1} sx={{ pt: 2 }}>
                        <Grid item xs={6} md={9}>
                            <ServiceTags />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <ServerTypeInput
                                value={serverType}
                                onChange={setServerType}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id='title-text-field' label='Title' variant='outlined' sx={{ pt: 2 }} />
                            <FormHelperText>{t(i18n)`Please include price/rate in Title.`}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='content-text-field'
                                label='Content'
                                variant='outlined'
                                multiline
                                rows={5}
                                sx={{ pt: 2 }}
                            />
                        </Grid>
                        <Grid item xs={9} sx={{ mt: 2 }}>
                            <Select
                                labelId='slot-select-field-label'
                                id='slot-select-field'
                                value={numOfSlots}
                                label='Slots'
                                onChange={handleSlotsChange}
                            >
                                <MenuItem value={1}>One</MenuItem>
                                <MenuItem value={2}>Two</MenuItem>
                                <MenuItem value={3}>Three</MenuItem>
                            </Select>
                            <FormHelperText># of slots (max 3)</FormHelperText>
                        </Grid>
                        <Grid item xs={3} sx={{ mt: 2 }}>
                            <Button
                                color='success'
                                variant='outlined'
                                startIcon={<PlaylistAddOutlinedIcon />}
                                sx={{ ml: matches ? 0 : -2 }}
                            >
                                {t(i18n)`Create`}
                            </Button>
                            <Button
                                color='error'
                                variant='outlined'
                                startIcon={<RestartAltIcon />}
                                sx={{ ml: matches ? 1 : -1, mt: matches ? 0 : 1 }}
                            >
                                {t(i18n)`Clear`}
                            </Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </Box>
        </Card>
    );
};
