import { ReactNode, useCallback } from 'react';
import { Form, RegistrationData } from './components/Registration.form';
import { Box } from '@mui/material';

type CallbackFunction = (data: RegistrationData) => void;

const pageStyles = {
  registrationPage: { display: 'flex', margin: '0 auto' },
};

function RegistrationPage(): ReactNode {
  const cb: CallbackFunction = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <>
      <Box sx={pageStyles.registrationPage}>
        <Form onRegFormSubmitSuccess={cb} />
      </Box>
    </>
  );
}

export default RegistrationPage;
