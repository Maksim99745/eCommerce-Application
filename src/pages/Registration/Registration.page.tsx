import { useAuth } from '@core/api/use-auth.hook';
import { ReactNode, useCallback, useRef } from 'react';
import { Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { RegistrationForm, RegistrationFormProps } from './components/RegistrationForm';

function RegistrationPage(): ReactNode {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  const handleFormSubmit = useCallback<RegistrationFormProps['onSubmit']>(
    (data) => {
      register(data)
        .then(() => navigateRef.current('/'))
        .catch((error) => console.warn(error));
    },
    [register],
  );

  return (
    <Stack direction="column" alignItems="center">
      <RegistrationForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      <Typography marginTop={2}>
        Already have an account? <Link to="/login">Sign in</Link>
      </Typography>
    </Stack>
  );
}

export default RegistrationPage;
