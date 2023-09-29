import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { PosNegRatingInput } from '@modules/common/components/posneg-rating.component';
import { StarRatingInput } from '@modules/common/components/star-rating.component';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { useCloseVouchQuery } from '@modules/redux/slices';

interface VouchFormData {
    starRating: number;
    goodRating: boolean;
    notes: string;
}

interface VouchFormProps {
    entity: API.ServiceDto;
    recipient: API.UserDto;
    description: string;
}

export const VouchForm: React.FC<VouchFormProps> = ({
    entity,
    recipient,
    description,
}) => {
    const { i18n } = useLingui();

    const [vouchData, setVouchData] = React.useState<VouchFormData>({
        starRating: 3,
        goodRating: true,
        notes: '',
    });

    const handleRatingChange = (newRating: number) => {
        setVouchData({ ...vouchData, starRating: newRating });
    };

    const handleThumbChange = () => {
        setVouchData({ ...vouchData, goodRating: !vouchData.goodRating });
    };

    const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVouchData({ ...vouchData, notes: event.target.value });
    };

    const handleSubmit = () => {
        useCloseVouchQuery({
            id: entity.id,
            rating: vouchData.starRating * 2, // Precision of 1-5 to 1-10 for database
            isPositive: vouchData.goodRating,
            description: vouchData.notes,
        });
    }

    return (
        <React.Fragment>
            <Grid container spacing={1} mt={2} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                <Grid xs={9} mt={2} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                    <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid
                            container
                            spacing={2}
                            m={2}
                            display={'flex'}
                            justifyContent={'center'}
                            alignContent={'center'}
                        >
                            <Grid xs={12}>
                                <Card sx={{ m: 3 }} elevation={0}>
                                    <Grid container display={'flex'}>
                                        <Grid
                                            xs={12}
                                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            <Typography variant='h6' fontWeight='bold'>
                                                {entity?.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            xs={12}
                                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            <Common.UserRating
                                                user={recipient?.battleNetTag}
                                                rating={recipient?.vouchRating}
                                                score={recipient?.vouchScore}
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <Typography variant='h6'>
                                    {t(i18n)`Please rate the ${description}.`}
                                </Typography>
                            </Grid>
                            <Grid xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <Typography variant='h6' pt={1} mt={-1}>
                                    {t(i18n)`Is this a positive or negative review?`}
                                </Typography>
                            </Grid>
                            <Grid xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <StarRatingInput value={vouchData.starRating} onChange={handleRatingChange} />
                            </Grid>
                            <Grid xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <PosNegRatingInput value={vouchData.goodRating} onChange={handleThumbChange} />
                            </Grid>
                            <Grid xs={12} m={3} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <TextField
                                    id='outlined-textarea'
                                    label={t(i18n)`Any comments?`}
                                    placeholder='Notes'
                                    multiline
                                    value={vouchData.notes}
                                    onChange={handleNotesChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <Button
                                    variant='outlined'
                                    fullWidth
                                    onClick={handleSubmit}
                                >
                                    {t(i18n)`Submit`}
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
