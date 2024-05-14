import { Box, Button, Typography } from '@mui/material';
import { FormContainer, TextFieldElement, PasswordElement } from 'react-hook-form-mui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginFormSchema } from '@core/validation/user-login.validation.schema';
import LoginIcon from '@mui/icons-material/Login';
import RegisterIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

const formStyles = {
  form: { display: 'flex', flexDirection: 'column', width: '100%', height: '100%' },
  submitButton: { width: '45%' },
  textField: { width: '100%' },
  divider: { height: '1px', backgroundColor: 'black' },
  buttonContainer: { display: 'flex', justifyContent: 'space-between', marginTop: '1em' },
};

type UserLoginData = z.infer<typeof loginFormSchema>;

export interface LoginFormProps {
  onSubmit: (registrationData: UserLoginData) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const navigate = useNavigate();
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
      <Box sx={formStyles.form}>
        <Typography variant="h4" gutterBottom>
          Log in
        </Typography>
        <TextFieldElement name="email" label="Example.email@domain.com" required helperText=" " />
        <PasswordElement name="password" label="Password" required helperText=" " margin="dense" />
        <Box sx={formStyles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={formStyles.submitButton}
            startIcon={<LoginIcon />}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={formStyles.submitButton}
            startIcon={<RegisterIcon />}
            onClick={() => {
              navigate('/registration');
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </FormContainer>
  );
}
