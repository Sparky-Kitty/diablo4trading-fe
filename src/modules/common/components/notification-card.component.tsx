import { useEditSlotStateMutation } from '@modules/redux/slices';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { Common } from '..';
import { VouchForm } from './vouch-form.component';

interface NotificationCardProps {
    recipient: API.UserDto;
    entity: API.ServiceSlotDto; // || API.TradeBidDto || API.VouchDto ? (when we start refactoring to include trades/vouches)
    message: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
    recipient,
    entity,
    message,
}) => {
    const [editSlotState] = useEditSlotStateMutation();
    const handleEdit = (newState: API.ServiceSlotStates) => editSlotState({ id: entity.id, state: newState });
    const handleOpenVouch = () => setOpenVouch(true);
    const handleCloseVouch = () => setOpenVouch(false);

    const [yes, setYes] = React.useState<API.ServiceSlotStates>(null);
    const [yesText, setYesText] = React.useState<string>('Yes');
    const [no, setNo] = React.useState<API.ServiceSlotStates>(null);
    const [noText, setNoText] = React.useState<string>('No');
    const [openVouch, setOpenVouch] = React.useState(false);
    const [recip, setRecip] = React.useState<API.UserDto>(null);
    const [description, setDescription] = React.useState<string>(null);

    React.useEffect(() => {
        if (recipient.id === entity?.serviceOwnerUserId) {
            setRecip(entity?.client);
            setDescription("client");
        } else if (recipient.id === entity?.clientUserId) {
            setDescription("service");
            setRecip(entity?.serviceOwner);
        }

        switch (entity.state) {
            case API.ServiceSlotStates.Accepted:
                setYes(API.ServiceSlotStates.Ended);
                setYesText('End');
                setNoText(null);
                setNo(null);
                break;
            case API.ServiceSlotStates.Rejected:
                setYesText(null);
                setNoText(null);
                setYes(null);
                setNo(null);
                break;
            case API.ServiceSlotStates.Ended:
                setYesText('Vouch');
                setNoText(null);
                setYes(null);
                setNo(null);
                break;

            default:
                API.ServiceSlotStates.Pending;
                setYes(API.ServiceSlotStates.Accepted);
                setYesText('Accept');
                setNo(API.ServiceSlotStates.Rejected);
                setNoText('Reject');
                break;
        }
    });

    if (!recipient || !message || !entity || entity.state == API.ServiceSlotStates.Rejected) {
        return null;
    }

    return (
        <Card sx={{ p: 2, mt: 2, display: 'flex' }} elevation={3}>
            <Box flex='1'>
                <Dialog open={openVouch} onClose={handleCloseVouch} maxWidth={'md'}>
                    <DialogContent>
                        <VouchForm entity={entity?.service} recipient={recip} description={description} />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseVouch}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Box
                    sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant='h5' fontWeight='bold'>
                                {entity?.service?.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Common.UserRating
                                user={recip?.battleNetTag}
                                rating={recip?.vouchRating}
                                score={recip?.vouchScore}
                            />
                            <Typography variant='subtitle1' fontWeight='bold'>
                                {message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='flex-end'>
                            {yes
                                ? (
                                    <Button
                                        color='success'
                                        variant='outlined'
                                        onClick={() => handleEdit(yes)}
                                        sx={{ ml: 1 }}
                                    >
                                        {yesText}
                                    </Button>
                                )
                                : (
                                    <Button
                                        color='success'
                                        variant='outlined'
                                        onClick={handleOpenVouch}
                                        sx={{ ml: 1 }}
                                    >
                                        {yesText}
                                    </Button>
                                )}
                            {no
                                ? (
                                    <Button
                                        color='error'
                                        variant='outlined'
                                        onClick={() => handleEdit(no)}
                                        sx={{ ml: 1 }}
                                    >
                                        {noText}
                                    </Button>
                                )
                                : <></>}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Card>
    );
};
