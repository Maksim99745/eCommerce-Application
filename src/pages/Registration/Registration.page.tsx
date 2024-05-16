import { useAuth } from '@core/api/use-auth.hook';
import { ReactNode, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { RegistrationForm, RegistrationFormProps } from './components/RegistrationForm';

function RegistrationPage(): ReactNode {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = useCallback<RegistrationFormProps['onSubmit']>(
    (data) => {
      register(data)
        .then(() => navigate('/'))
        .catch((error) => console.log(error));
    },
    [navigate, register],
  );

  return (
    <Stack>
      <RegistrationForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      <Typography marginTop={2}>
        Already have an account? <Link to="/login">Login in</Link>
      </Typography>
    </Stack>
  );
}

export default RegistrationPage;
