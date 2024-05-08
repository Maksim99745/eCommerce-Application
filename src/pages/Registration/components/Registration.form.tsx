import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormProvider, useForm } from 'react-hook-form-mui';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const formStyles = {
  form: { display: 'flex', flexDirection: 'column', width: '100%', height: '80%', gap: 2 },
  submitButton: { width: 100 },
  textField: { minWidth: 410 },
};

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, '8+ chars, 1 uppercase, 1 lowercase, 1 number')
    .refine(
      (value) => {
        return /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value);
      },
      {
        message: '8+ chars, 1 uppercase, 1 lowercase, 1 number',
      },
    ),
  firstName: z.string().min(1, 'First name should contains at least 1 symbol'),
  lastName: z.string().min(1, 'Last name should contains at least 1 symbol'),
  birthDate: z.string().min(1, 'Last name should contains at least 1 symbol'),
});

export type RegistrationData = z.infer<typeof schema>;

interface FormProps {
  onRegFormSubmitSuccess: (data: RegistrationData) => void;
}

export function Form({ onRegFormSubmitSuccess }: FormProps) {
  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<RegistrationData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: '',
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onRegFormSubmitSuccess)}>
        <Box sx={formStyles.form}>
          <Typography variant="h4" gutterBottom>
            Sign in
          </Typography>
          <TextField
            label="Email"
            required
            error={!!errors.email?.message && touchedFields.email}
            helperText={errors.email?.message}
            {...register('email')}
            sx={formStyles.textField}
          />

          <FormControl sx={formStyles.textField} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              required
              error={!!errors.password?.message && touchedFields.password}
              {...register('password')}
              label="Password"
            />
            <FormHelperText error id="accountId-error">
              {errors.password?.message}
            </FormHelperText>
          </FormControl>

          <TextField
            label="Name"
            required
            error={!!errors.firstName?.message && touchedFields.firstName}
            helperText={errors.firstName?.message}
            {...register('firstName')}
            sx={formStyles.textField}
          />

          <TextField
            label="Last name"
            required
            error={!!errors.lastName?.message && touchedFields.lastName}
            helperText={errors.lastName?.message}
            {...register('lastName')}
            sx={formStyles.textField}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer {...register('birthDate')} components={['DatePicker']}>
              <DatePicker label="Basic date picker" />
            </DemoContainer>
          </LocalizationProvider>

          <Button type="submit" variant="contained" color="primary" sx={formStyles.submitButton}>
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
}
