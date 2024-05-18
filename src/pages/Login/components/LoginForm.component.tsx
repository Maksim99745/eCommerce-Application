import { FormContainer, TextFieldElement, PasswordElement } from 'react-hook-form-mui';
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@core/validation/user-login/user-login.schema';
import LoginIcon from '@mui/icons-material/Login';
import { LoginForm } from '@models/index';

export interface LoginFormProps {
  onSubmit: (registrationData: LoginForm) => void;
  isLoading: boolean;
}

export function LoginFormComponent({ onSubmit, isLoading }: LoginFormProps) {
  return (
    <FormContainer<LoginForm>
      resolver={zodResolver(loginFormSchema)}
      defaultValues={{
        email: '',
        password: '',
      }}
      onSuccess={onSubmit}
      mode="onChange"
    >
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <Typography variant="h4" gutterBottom align="center">
          Sign in to Homeware Hub
        </Typography>
        <TextFieldElement
          disabled={isLoading}
          fullWidth
          name="email"
          label="Example.email@domain.com"
          required
          helperText=" "
          InputLabelProps={{ shrink: true }}
        />
        <PasswordElement
          disabled={isLoading}
          fullWidth
          name="password"
          label="Password"
          required
          helperText=" "
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          sx={{ maxWidth: '160px', align: 'center', textTransform: 'none' }}
          startIcon={<LoginIcon />}
          loading={isLoading}
        >
          Sign in
        </LoadingButton>
      </Stack>
    </FormContainer>
  );
}
