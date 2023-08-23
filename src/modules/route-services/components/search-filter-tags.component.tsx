import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Divider, Grid, Typography } from '@mui/material';
// import { API } from './../../../abcd-shared/api';
// import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { ServiceTitleInput } from './inputs';
import { ServiceTags } from './service-tags.component';

const TAGS = {
    POWERLEVELING: 1 << 0,
    BOSS_HELP: 1 << 1,
    UBER_LILITH: 1 << 2,
    CAPSTONE_BOOST: 1 << 3,
    EUROPE: 1 << 4,
    ASIA: 1 << 5,
    AMERICA: 1 << 6,
};

interface SearchFilterTagsProps {
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
}

export const SearchFilterTags: React.FC<SearchFilterTagsProps> = ({
    value,
    onChange,
    disabled,
}) => {
    const { i18n } = useLingui();
    
    const [selectedTags, setSelectedTags] = React.useState<number[]>([]);

    const handleTagsSelection = (newTags: number[]) => {
        setSelectedTags(() => newTags);
        const newNumber = newTags.reduce((acc, tag) => acc | tag, 0);
        onChange(value = newNumber);
    };

    const numberToTags = (numberValue: number): string[] => {
        const selectedTags: string[] = [];
    
        for (const tag in TAGS) {
            if ((numberValue & TAGS[tag]) !== 0) {
                selectedTags.push(tag.replace("_", " "));
            }
        }
        return selectedTags;
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant='subtitle2' color='text.secondary'>
                    {t(i18n)`Service Tags`}
                </Typography>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <ServiceTags selectedTags={selectedTags} onSelectTags={handleTagsSelection} />
            </Grid>
        </Grid>
    );
};
