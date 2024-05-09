import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form-mui';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';

import React from 'react';

const formStyles = {
  form: { display: 'flex', flexDirection: 'column', width: '100%', height: '100%', gap: 2 },
  submitButton: { width: 100 },
  textField: { minWidth: 410 },
  divider: { height: '1px', backgroundColor: 'black' },
};

const isOlderThan13 = (dateString: string) => {
  let birthday = new Date(dateString);
  let today = new Date();
  let age = today.getTime() - birthday.getTime();
  let years = age / (1000 * 60 * 60 * 24 * 365.25);
  return years >= 13;
};

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, '8+ chars, 1 uppercase, 1 lowercase, 1 number')
    .refine(
      (value) => {
        //TODO: .regex
        return /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value);
      },
      {
        message: '8+ chars, 1 uppercase, 1 lowercase, 1 number',
      },
    ),
  firstName: z.string().min(1, 'First name should contains at least 1 symbol'),
  lastName: z.string().min(1, 'Last name should contains at least 1 symbol'),
  birthDate: z.string().refine(
    (value) => {
      return isOlderThan13(value);
    },
    {
      message: 'User should be older than 13 y.o.',
    },
  ),
  street: z.string().min(1, 'Street should contains at least 1 symbol'),
  city: z
    .string()
    .min(1, 'City should contains at least 1 symbol')
    .regex(/^[a-zA-Z]+$/, "Name of the city should n't contains numbers or special symbols"),
  country: z.string().min(1, 'Country should contains at least 1 symbol'),
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
      street: '',
      city: '',
      country: '',
    },
  });

  const countries: string[] = ['Poland', 'Ukraine', 'Uzbekistan', 'Serbia'];

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [country, setCountry] = React.useState('Poland');

  const handleCountry = (event) => {
    setCountry(event.target.outerText);
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
          {/* 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              // error={!!errors.birthDate?.message && touchedFields.birthDate}
              // helperText={errors.birthDate?.message}
              // required
              {...register('birthDate')}
            />
          </LocalizationProvider> */}

          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue=""
            error={!!errors.birthDate?.message && touchedFields.birthDate}
            helperText={errors.birthDate?.message}
            required
            {...register('birthDate')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Divider orientation="vertical" flexItem sx={formStyles.divider} />
          <Typography variant="h6" gutterBottom>
            Pass your address
          </Typography>
          <TextField
            label="Street"
            required
            error={!!errors.street?.message && touchedFields.street}
            helperText={errors.street?.message}
            {...register('street')}
            sx={formStyles.textField}
          />
          <TextField
            label="City"
            required
            error={!!errors.city?.message && touchedFields.city}
            helperText={errors.city?.message}
            {...register('city')}
            sx={formStyles.textField}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue="Poland"
            helperText="Please select your country"
            required
            {...register('country')}
          >
            {countries.map((option: string) => (
              <MenuItem key={option} value={country} onClick={(event) => handleCountry(event)}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary" sx={formStyles.submitButton}>
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
}
