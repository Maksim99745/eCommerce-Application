import { ReactNode, useCallback } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginForm, LoginFormProps } from './components/LoginForm';

function LoginPage(): ReactNode {
  const handleFormSubmit = useCallback<LoginFormProps['onSubmit']>(async (data) => {
    console.log(data);
    return Promise.resolve('Ok');
  }, []);
  const navigate = useNavigate();

  return (
    <Paper elevation={3} sx={{ mt: 'auto', mb: 'auto', pt: '10vh', pb: '10vh' }}>
      <Container maxWidth="sm">
        <LoginForm onSubmit={handleFormSubmit} />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            mt: 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography component="span" align="center" sx={{ mr: 1 }}>
            Don&apos;t have an account?
          </Typography>
          <Typography
            component="a"
            sx={{ cursor: 'pointer', color: '#087aef' }}
            onClick={() => {
              navigate('/registration');
            }}
          >
            Sign up
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}

export default LoginPage;
