import { UserService } from '@core/api/user.service';
import { userLoadingSignal } from '@core/signals/user.signal';
import { ReactNode } from 'react';
import { Stack, Typography, useEventCallback } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { RegistrationForm, RegistrationFormProps } from './components/RegistrationForm';

function RegistrationPage(): ReactNode {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = useEventCallback<RegistrationFormProps['onSubmit']>((data) => {
    UserService.register(data)
      .then(() => {
        navigate('/');
      })
      .then(() => {
        enqueueSnackbar(`Welcome! ${data.firstName} ${data.lastName}`, {
          variant: 'success',
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        });
      })
      .catch((error) => {
        enqueueSnackbar(`${error.message}`, {
          variant: 'error',
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        });
      });
  });

  return (
    <Stack direction="column" alignItems="center">
      <RegistrationForm onSubmit={handleFormSubmit} isLoading={userLoadingSignal.value} />
      <Typography marginTop={2}>
        Already have an account? <Link to="/login">Sign in</Link>
      </Typography>
    </Stack>
  );
}

export default RegistrationPage;
