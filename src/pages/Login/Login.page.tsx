import { UserService } from '@core/api/user.service';
import { userLoadingSignal } from '@core/signals/user.signal';
import { ReactNode } from 'react';
import { Container, Typography, Box, Paper, useEventCallback, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useShowMessage } from '@utils/useShowMessage';
import { LoginForm, LoginFormProps } from './components/LoginForm';

function LoginPage(): ReactNode {
  const navigate = useNavigate();
  const showMessage = useShowMessage();

  const handleFormSubmit = useEventCallback<LoginFormProps['onSubmit']>((data) => {
    UserService.login(data)
      .then(() => {
        showMessage('Welcome! Happy shopping!');
        navigate('/');
      })
      .catch((error) => {
        showMessage(`${error.message}`, 'error');
      });
  });

  return (
    <Paper elevation={3} sx={{ m: 'auto', p: '10vh 2%', maxWidth: '700px' }}>
      <Container maxWidth="sm">
        <LoginForm onSubmit={handleFormSubmit} isLoading={userLoadingSignal.value} />
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
          <Button component={Link} to="/registration" disabled={userLoadingSignal.value} sx={{ textTransform: 'none' }}>
            Sign up
          </Button>
          <Button component={Link} to="/registration" disabled={userLoadingSignal.value} sx={{ textTransform: 'none' }}>
            Sign up
          </Button>
        </Box>
      </Container>
    </Paper>
  );
}

export default LoginPage;
