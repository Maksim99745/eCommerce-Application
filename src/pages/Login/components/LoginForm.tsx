import { Box, Button, Typography } from '@mui/material';
import { FormContainer, TextFieldElement, PasswordElement } from 'react-hook-form-mui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginFormSchema } from '@core/validation/user-login.validation.schema';

const formStyles = {
  form: { display: 'flex', flexDirection: 'column', width: '100%', height: '100%' },
  submitButton: { width: 100 },
  textField: { minWidth: 410 },
  divider: { height: '1px', backgroundColor: 'black' },
};

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
    >
      <Box sx={formStyles.form}>
        <Typography variant="h4" gutterBottom>
          Log in
        </Typography>
        <TextFieldElement name="email" label="Example.email@domain.com" required helperText=" " />
        <PasswordElement name="password" label="Password" required helperText=" " margin="dense" />
        <Button type="submit" variant="contained" color="primary" sx={formStyles.submitButton}>
          Submit
        </Button>
      </Box>
    </FormContainer>
  );
}
