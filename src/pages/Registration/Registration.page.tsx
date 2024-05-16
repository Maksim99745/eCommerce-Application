import { UserService } from '@core/api/user.service';
import { userLoadingSignal } from '@core/signals/user.signal';
import { ReactNode, useCallback, useRef } from 'react';
import { Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { RegistrationForm, RegistrationFormProps } from './components/RegistrationForm';

function RegistrationPage(): ReactNode {
  const navigate = useNavigate();

  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  const handleFormSubmit = useCallback<RegistrationFormProps['onSubmit']>((data) => {
    UserService.register(data)
      .then(() => navigateRef.current('/'))
      .catch((error) => console.warn(error));
  }, []);

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
