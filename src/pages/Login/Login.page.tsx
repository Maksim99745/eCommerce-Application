import { ReactNode, useCallback } from 'react';
import { Box } from '@mui/material';
import { LoginForm, LoginFormProps } from './components/LoginForm';

const pageStyles = {
  loginPage: { display: 'flex', margin: '0 auto' },
};

function LoginPage(): ReactNode {
  const handleFormSubmit = useCallback<LoginFormProps['onSubmit']>(async (data) => {
    console.log(data);
    return Promise.resolve('Ok');
  }, []);

  return (
    <Box sx={pageStyles.loginPage}>
      <LoginForm onSubmit={handleFormSubmit} />
    </Box>
  );
}

export default LoginPage;
