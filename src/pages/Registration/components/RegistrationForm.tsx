import { LoadingButton } from '@mui/lab';
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
  DatePickerElement,
  useForm,
  CheckboxElement,
  useWatch,
} from 'react-hook-form-mui';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Grid, Typography } from '@mui/material';
import {
  BILLING_ADDRESS_IDX,
  registrationSchema,
  SHIPPING_ADDRESS_IDX,
} from '@core/validation/user-registration.validation.schema';
import { z } from 'zod';
import { defaultCountryOption } from '@constants/countries.const';
import { UserAddress } from './UserAddress';

export type UserRegistrationData = z.infer<typeof registrationSchema>;

export interface RegistrationFormProps {
  onSubmit: (registrationData: UserRegistrationData) => void;
  isLoading: boolean;
}

export function RegistrationForm({ onSubmit, isLoading }: RegistrationFormProps) {
  const formContext = useForm<UserRegistrationData>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      shippingAsBilling: false,
      addresses: [
        { street: '', city: '', country: defaultCountryOption.id, postalCode: '', isDefault: false },
        { street: '', city: '', country: defaultCountryOption.id, postalCode: '', isDefault: false },
      ],
    },
    resolver: zodResolver(registrationSchema),
  });

  const { control, trigger } = formContext;
  const shippingAsBilling = useWatch<UserRegistrationData>({ control, name: 'shippingAsBilling' });

  return (
    <Container maxWidth="md">
      <FormContainer<UserRegistrationData> formContext={formContext} onSuccess={onSubmit} mode="onChange">
        <Typography variant="h4" gutterBottom>
          Sign up
        </Typography>
        <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1, md: 2 }}>
          <Grid item xs={1}>
            <TextFieldElement<UserRegistrationData>
              name="email"
              label="Email"
              required
              helperText=" "
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <PasswordElement<UserRegistrationData>
              label="Password"
              required
              name="password"
              helperText=" "
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1, md: 12 }}>
          <Grid item xs={1} md={6}>
            <TextFieldElement<UserRegistrationData>
              name="firstName"
              label="First Name"
              required
              helperText=" "
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={1} md={6}>
            <TextFieldElement<UserRegistrationData>
              name="lastName"
              label="Last Name"
              required
              helperText=" "
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Grid item xs={1} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePickerElement<UserRegistrationData>
              name="birthDate"
              label="Birth Date"
              required
              helperText=" "
              sx={{ maxWidth: 350, alignItem: 'start' }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1, md: 2 }}>
          {/* eslint-disable-next-line no-magic-numbers */}
          <Grid item xs={shippingAsBilling ? 2 : 1}>
            <UserAddress
              title="Shipping address"
              addressIndex={SHIPPING_ADDRESS_IDX}
              onCountryChange={() => trigger(`addresses.${SHIPPING_ADDRESS_IDX}.postalCode`)}
            />
            <Grid item>
              <CheckboxElement<UserRegistrationData> name="shippingAsBilling" label="Use as billing address" />
            </Grid>
          </Grid>
          {!shippingAsBilling && (
            <Grid item xs={1}>
              <UserAddress
                title="Billing address"
                addressIndex={BILLING_ADDRESS_IDX}
                onCountryChange={() => trigger(`addresses.${BILLING_ADDRESS_IDX}.postalCode`)}
              />
            </Grid>
          )}
        </Grid>
        <LoadingButton loading={isLoading} type="submit" variant="contained" color="primary" sx={{ mx: 'auto' }}>
          Sign up
        </LoadingButton>
      </FormContainer>
    </Container>
  );
}
