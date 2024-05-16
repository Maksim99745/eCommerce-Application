import { LoadingButton } from '@mui/lab';
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
import { Box, Typography } from '@mui/material';
import { countriesOptions, defaultCountryOption } from '@constants/countries.const';
import { registrationSchema } from '@core/validation/user-registration.validation.schema';

const formStyles = {
  form: { display: 'flex', flexDirection: 'column', width: '100%', height: '100%' },
  submitButton: { width: 100 },
  textField: { minWidth: 410 },
  divider: { height: '1px', backgroundColor: 'black' },
};

export interface RegistrationFormProps {
  onSubmit: (registrationData: UserRegistrationData) => void;
  isLoading: boolean;
}

export function RegistrationForm({ onSubmit, isLoading }: RegistrationFormProps) {
  return (
    <FormContainer<UserRegistrationData>
      resolver={zodResolver(registrationSchema)}
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
        <TextFieldElement<UserRegistrationData> name="email" label="Email" required helperText=" " />
        <PasswordElement<UserRegistrationData>
          margin="dense"
          label="Password"
          required
          name="password"
          helperText=" "
        />
        <TextFieldElement<UserRegistrationData> name="firstName" label="First Name" required helperText=" " />
        <TextFieldElement<UserRegistrationData> name="lastName" label="Last Name" required helperText=" " />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerElement<UserRegistrationData> name="birthDate" label="Birth Date" required helperText=" " />
        </LocalizationProvider>
        <Typography variant="h6" gutterBottom>
          Pass your address
        </Typography>
        <SelectElement<UserRegistrationData>
          label="Country"
          name="country"
          options={countriesOptions}
          helperText=" "
          required
        />
        <TextFieldElement<UserRegistrationData> name="postalCode" label="Postal Code" required helperText=" " />
        <TextFieldElement<UserRegistrationData> name="city" label="City" required helperText=" " />
        <TextFieldElement<UserRegistrationData> name="street" label="Street" required helperText=" " />
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          color="primary"
          sx={formStyles.submitButton}
        >
          Sign up
        </LoadingButton>
      </Box>
    </FormContainer>
  );
}
