import { Redux } from '@modules/redux';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Avatar, Box, Card, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Common } from '..';

export const HeaderNotifications: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const user = useSelector(Redux.AuthSelectors.getUser);
    if (user) {
        return (
            <React.Fragment>
                <IconButton
                    onMouseEnter={handleOpenMenu}
                >
                    <NotificationsActiveIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <Card
                        elevation={2}
                        sx={{ outlineColor: 'error', boxShadow: '0 0 10px #d32f2f' }}
                    >
                        <MenuItem
                            onClick={handleCloseMenu}
                        >
                            <Grid
                                container
                                spacing={1}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Grid xs={6} display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 2,
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Grid container spacing={1}>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={6}
                                                            display={'flex'}
                                                            justifyContent={'flex-start'}
                                                            alignItems={'flex-start'}
                                                        >
                                                            <Avatar
                                                                src='https://placekitten.com/40/40'
                                                                sx={{ pr: -20 }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Box ml={-3}>
                                                                <Typography
                                                                    variant='subtitle1'
                                                                    fontWeight='bold'
                                                                >
                                                                    {'SparkyOnyx#1187'}
                                                                </Typography>
                                                                <Common.UserRating rating={6} score={456} />
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid xs={6} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                                    <Typography
                                        variant='body2'
                                        sx={{ ml: 5 }}
                                    >
                                        Has bought your service
                                    </Typography>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    </Card>
                </Menu>
            </React.Fragment>
        );
    }
};
