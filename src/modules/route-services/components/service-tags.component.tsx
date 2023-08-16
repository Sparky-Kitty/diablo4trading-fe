import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
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

export const ServiceTags: React.FC = () => {
    const [selectedTags, setSelectedTags] = React.useState<number[]>([]);

    const handleTagSelection = (_, newTags: number[]) => {
        setSelectedTags(() => newTags);
    };

    const { i18n } = useLingui();

        return (
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
        );
};