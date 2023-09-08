import background from '@assets/background.webp';
import { Common } from '@modules/common';
import { Redux } from '@modules/redux';
import { Alert, Container, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';

const Main = styled('main')(() => ({
    display: 'flex',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'top center',
    backgroundSize: 'cover',
}));

interface MasterLayoutProps {
    hideNavigation?: boolean;
    children?: React.ReactNode;
}

export const MasterLayout: React.FC<MasterLayoutProps> = ({
    hideNavigation,
    children,
}) => {
    const error = useSelector(Redux.SnackbarSelectors.getError);
    const active = useSelector(Redux.SnackbarSelectors.getActive);
    const message = useSelector(Redux.SnackbarSelectors.getMessage);
        
        // Redux.SNACKBAR_STATE_INITAL;
    return (
        <React.Fragment>
            {<Common.Header hideNavigation={hideNavigation} />}
            <Main
                sx={{
                    minHeight: `calc(100vh - ${Common.HEADER_HEIGHT}px - ${Common.FOOTER_HEIGHT}px)`,
                }}
            >
                <Container
                    maxWidth='xl'
                    sx={{ pt: 2, pb: 2 }}
                >
                    {error.toString()}
                    {children}
                    <Snackbar
                        open={active}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert severity={error ? 'error' : 'success'}>
                            {message}
                        </Alert>
                    </Snackbar>
                </Container>
            </Main>
            <Common.Footer />
        </React.Fragment>
    );
};
