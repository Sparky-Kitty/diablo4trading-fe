import LanguageIcon from '@mui/icons-material/Language';
import { Button } from '@mui/material';
import React from 'react';

export const HeaderEnglishLanguage: React.FC = () => {
    return (
        <React.Fragment>
            <Button
                startIcon={<LanguageIcon />}
                color='secondary'
            >
                English
            </Button>
        </React.Fragment>
    );
};
