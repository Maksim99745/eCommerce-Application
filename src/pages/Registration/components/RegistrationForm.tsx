import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
  SelectElement,
  DatePickerElement,
} from 'react-hook-form-mui';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRegistrationData } from '@models/index';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { getUseRegistrationSchema } from '@core/validation/user-registration.validation.schema';
import { countriesOptions, defaultCountryOption } from '@constants/countries.const';

const formStyles = {
  form: { display: 'flex', flexDirection: 'column', width: '100%', height: '100%' },
  submitButton: { width: 100 },
  textField: { minWidth: 410 },
  divider: { height: '1px', backgroundColor: 'black' },
};

export interface RegistrationFormProps {
  onSubmit: (registrationData: UserRegistrationData) => void;
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [selectedCountry, setSelectedCountry] = React.useState(defaultCountryOption);

  const handleCountryChange = React.useCallback((selectedId: string) => {
    const countryOption = countriesOptions.find(({ id }) => id === selectedId);
    if (countryOption) {
      setSelectedCountry(countryOption);
    }
  }, []);

  return (
    <FormContainer<UserRegistrationData>
      resolver={zodResolver(getUseRegistrationSchema(selectedCountry.label))}
      defaultValues={{
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        street: '',
        city: '',
        country: defaultCountryOption.id,
        postalCode: '',
      }}
      onSuccess={onSubmit}
    >
      <Box sx={formStyles.form}>
        <Typography variant="h4" gutterBottom>
          Sign in
        </Typography>
        <TextFieldElement name="email" label="Email" required helperText=" " />
        <PasswordElement margin="dense" label="Password" required name="password" helperText=" " />
        <Typography variant="h6" gutterBottom>
          Pass your address
        </Typography>
        <SelectElement
          label="Country"
          name="country"
          options={countriesOptions}
          helperText=" "
          required
          onChange={handleCountryChange}
        />
        <TextFieldElement name="postalCode" label="Postal Code" required helperText=" " />
        <TextFieldElement name="city" label="City" required helperText=" " />
        <TextFieldElement name="street" label="Street" required helperText=" " />

        <TextFieldElement name="firstName" label="First Name" required helperText=" " />
        <TextFieldElement name="lastName" label="Last Name" required helperText=" " />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerElement name="birthDate" label="Birth Date" required helperText=" " />
        </LocalizationProvider>
        <Button type="submit" variant="contained" color="primary" sx={formStyles.submitButton}>
          Submit
        </Button>
      </Box>
    </FormContainer>
  );
}
