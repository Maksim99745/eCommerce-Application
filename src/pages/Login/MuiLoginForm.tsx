import { TextField, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from './schema';
// import classes from './MuiLoginForm.module.css';

type LoginFormInputs = {
  email: string;
  password: string;
};

export function MuiLoginForm() {
  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  function onSubmitHandler(data: LoginFormInputs) {
    console.log(`
    Login: ${data.email}
    Password: ${data.password}`);
  }
  return (
    <>
      <h1>Login</h1>
      <form className="loginForm" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <Stack spacing={2} width={500}>
          <TextField
            label="Email@domain.com"
            type="email"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          ></TextField>
          <TextField
            label="Password"
            type="password"
            {...register('password', { required: 'password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
          <Button type="submit" color="primary" variant="contained">
            Login
          </Button>
        </Stack>
      </form>
    </>
  );
}
