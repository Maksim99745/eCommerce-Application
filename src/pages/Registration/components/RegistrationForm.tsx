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
import { useCallback, useEffect, useState } from 'react';
import { countriesOptions, defaultCountryOption } from '@constants/countries.const';
import { postalValidationRegEx, registrationSchema } from '@core/validation/user-registration.validation.schema';
import { z } from 'zod';

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
  const [selectedCountry, setSelectedCountry] = useState(defaultCountryOption);
  const [schema, newSchema] = useState(registrationSchema);

  const handleCountryChange = useCallback((selectedId: string) => {
    const countryOption = countriesOptions.find(({ id }) => id === selectedId);
    if (countryOption) {
      setSelectedCountry(countryOption);
    }
  }, []);

  useEffect(() => {
    const modifiedSchema = schema.extend({
      postalCode: z
        .string()
        .regex(
          new RegExp(postalValidationRegEx[selectedCountry.label]),
          `Invalid post code for country: ${selectedCountry.label}`,
        ),
    });
    newSchema(modifiedSchema);
  });

  return (
    <FormContainer<UserRegistrationData>
      resolver={zodResolver(schema)}
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
      mode="onChange"
    >
      <Box sx={formStyles.form}>
        <Typography variant="h4" gutterBottom>
          Sign in
        </Typography>
        <TextFieldElement name="email" label="Email" required helperText=" " />
        <PasswordElement margin="dense" label="Password" required name="password" helperText=" " />
        <TextFieldElement name="firstName" label="First Name" required helperText=" " />
        <TextFieldElement name="lastName" label="Last Name" required helperText=" " />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerElement name="birthDate" label="Birth Date" required helperText=" " />
        </LocalizationProvider>
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
        <Button type="submit" variant="contained" color="primary" sx={formStyles.submitButton}>
          Submit
        </Button>
      </Box>
    </FormContainer>
  );
}
