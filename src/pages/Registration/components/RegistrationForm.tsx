import { FormContainer, TextFieldElement, PasswordElement, DatePickerElement } from 'react-hook-form-mui';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRegistrationData } from '@models/index';
import { Box, Button, Stack, Typography } from '@mui/material';
import { defaultCountryOption } from '@constants/countries.const';
import { registrationSchema } from '@core/validation/user-registration.validation.schema';
import { UserAddress } from './UserAddress';

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
  return (
    <FormContainer<UserRegistrationData>
      resolver={zodResolver(registrationSchema)}
      defaultValues={{
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        addresses: [
          { street: '', city: '', country: defaultCountryOption.id, postalCode: '' },
          { street: '', city: '', country: defaultCountryOption.id, postalCode: '' },
        ],
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
        <Stack direction={'row'} gap={2}>
          <UserAddress title="Billing address" addressIndex={0} />
          <UserAddress title="Shipping address" addressIndex={1} />
        </Stack>
        <Button type="submit" variant="contained" color="primary" sx={formStyles.submitButton}>
          Submit
        </Button>
      </Box>
    </FormContainer>
  );
}
