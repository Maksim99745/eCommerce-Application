import { UserService } from '@core/api/user.service';
import { userLoadingSignal } from '@core/signals/user.signal';
import { ReactNode } from 'react';
import { Container, Typography, Box, Paper, useEventCallback } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { LoginForm, LoginFormProps } from './components/LoginForm';

function LoginPage(): ReactNode {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = useEventCallback<LoginFormProps['onSubmit']>((data) => {
    UserService.login(data)
      .then(() => {
        enqueueSnackbar('Welcome! Happy shopping!', {
          variant: 'success',
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        });
        navigate('/');
      })
      .catch((error) => {
        enqueueSnackbar(`${error.message}`, {
          variant: 'error',
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        });
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
          <Link to="/registration">Sign up</Link>
        </Box>
      </Container>
    </Paper>
  );
}

export default LoginPage;
