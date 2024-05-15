import { Button, Stack, Typography } from '@mui/material';
import { FormContainer, TextFieldElement, PasswordElement } from 'react-hook-form-mui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginFormSchema } from '@core/validation/user-login.validation.schema';
import LoginIcon from '@mui/icons-material/Login';

type UserLoginData = z.infer<typeof loginFormSchema>;

export interface LoginFormProps {
  onSubmit: (registrationData: UserLoginData) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <FormContainer<UserLoginData>
      resolver={zodResolver(loginFormSchema)}
      defaultValues={{
        email: '',
        password: '',
      }}
      onSuccess={onSubmit}
      mode="onChange"
    >
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        <Typography variant="h4" gutterBottom align="center">
          Sign in to Homeware Hub
        </Typography>
        <TextFieldElement fullWidth name="email" label="Example.email@domain.com" required helperText=" " />
        <PasswordElement fullWidth name="password" label="Password" required helperText=" " margin="dense" />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ maxWidth: '160px', align: 'center', textTransform: 'none' }}
          startIcon={<LoginIcon />}
        >
          Sign in
        </Button>
      </Stack>
    </FormContainer>
  );
}
