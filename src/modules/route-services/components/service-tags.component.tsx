import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material';
import React from 'react';

const TAGS = {
    POWERLEVELING: 1 << 0,
    BOSS_HELP: 1 << 1,
    UBER_LILITH: 1 << 2,
    CAPSTONE_BOOST: 1 << 3,
    EUROPE: 1 << 4,
    ASIA: 1 << 5,
    AMERICA: 1 << 6,
};

interface ServiceTagsProps {
    selectedTags: number[];
    onSelectTags: (newTags: number[]) => void;
}

export const ServiceTags: React.FC<ServiceTagsProps> = ({ selectedTags, onSelectTags }) => {
    const { i18n } = useLingui();
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <React.Fragment>
            <ToggleButtonGroup
                value={selectedTags}
                onChange={(_, newTags: number[]) => onSelectTags(newTags)} 
                aria-label={t(i18n)`Service Types`}
                orientation={`${matches ? `horizontal` : `vertical`}`}
            >
                <ToggleButton value={TAGS.POWERLEVELING}>{t(i18n)`Powerleveling`}</ToggleButton>
                <ToggleButton value={TAGS.BOSS_HELP}>{t(i18n)`Boss Help`}</ToggleButton>
                <ToggleButton value={TAGS.UBER_LILITH}>{t(i18n)`Uber Lilith`}</ToggleButton>
                <ToggleButton value={TAGS.CAPSTONE_BOOST}>{t(i18n)`Capstone Boost`}</ToggleButton>
                <ToggleButton value={TAGS.EUROPE}>{t(i18n)`Europe`}</ToggleButton>
                <ToggleButton value={TAGS.ASIA}>{t(i18n)`Asia`}</ToggleButton>
                <ToggleButton value={TAGS.AMERICA}>{t(i18n)`America`}</ToggleButton>
            </ToggleButtonGroup>
        </React.Fragment>
    );
};
