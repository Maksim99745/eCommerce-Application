import {
  BILLING_ADDRESS_IDX,
  NO_IDX,
  SHIPPING_ADDRESS_IDX,
} from '@core/validation/user-registration/user-registration.const';
import { RegistrationFormData } from '@models/index';
import { LoadingButton } from '@mui/lab';
import {
  CheckboxElement,
  FormContainer,
  PasswordElement,
  SelectElement,
  TextFieldElement,
  useForm,
  useWatch,
} from 'react-hook-form-mui';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container, FormLabel, Grid, Paper, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '@core/validation/user-registration/user-registration.schema';
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { getNewUserProfileAddress, useAddressRenderOptions } from '@utils/user-address-utils';
import { UserAddressComponent } from './UserAddress.component';

export interface RegistrationFormProps {
  onSubmit: (registrationData: RegistrationFormData) => void;
  isLoading: boolean;
}

export function RegistrationFormComponent({ onSubmit, isLoading }: RegistrationFormProps) {
  const formContext = useForm<RegistrationFormData>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: undefined,
      shippingAsBilling: false,
      defaultShippingAddressIdx: NO_IDX,
      defaultBillingAddressIdx: NO_IDX,
      addresses: [
        {
          ...getNewUserProfileAddress(),
          isShipping: true,
          isBilling: false,
        },
        {
          ...getNewUserProfileAddress(),
          isShipping: false,
          isBilling: true,
        },
      ],
    },
    resolver: zodResolver(registrationSchema),
    mode: 'all',
  });

  const { control, trigger, setValue } = formContext;
  const [shippingAsBilling, addresses] = useWatch({ control, name: ['shippingAsBilling', 'addresses'] });

  const getShippingAddressOptions = useAddressRenderOptions('shipping');
  const getBillingAddressOptions = useAddressRenderOptions('billing');

  return (
    <Paper elevation={3} sx={{ m: 'auto', p: '2dvh 1dvw', maxWidth: '900px', width: '100%' }}>
      <Container maxWidth="md">
        <FormContainer<RegistrationFormData> formContext={formContext} onSuccess={onSubmit}>
          <Grid container spacing={1} columns={1}>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Sign Up
              </Typography>
            </Grid>

            <Grid container item spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1, md: 2 }}>
              <Grid item xs={1}>
                <TextFieldElement<RegistrationFormData>
                  name="email"
                  label="Email"
                  required
                  helperText=" "
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={1}>
                <PasswordElement<RegistrationFormData>
                  label="Password"
                  required
                  name="password"
                  helperText=" "
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1, md: 12 }}>
              <Grid item xs={1} md={6}>
                <TextFieldElement<RegistrationFormData>
                  name="firstName"
                  label="First Name"
                  required
                  helperText=" "
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={1} md={6}>
                <TextFieldElement<RegistrationFormData>
                  name="lastName"
                  label="Last Name"
                  required
                  helperText=" "
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid item xs={1} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePickerElement
                  name="birthDate"
                  label="Birth Date"
                  required
                  helperText=" "
                  sx={{ maxWidth: 350, alignItem: 'start' }}
                  disabled={isLoading}
                />
              </LocalizationProvider>
            </Grid>

            <Grid container item spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1, md: 2 }}>
              <Grid item xs={shippingAsBilling ? 2 : 1}>
                <Paper elevation={1} sx={{ m: 'auto', p: '1vh 2%', maxWidth: '900px', width: '100%' }}>
                  <UserAddressComponent
                    title={<FormLabel sx={{ pb: 2 }}>Shipping address</FormLabel>}
                    addressIndex={SHIPPING_ADDRESS_IDX}
                    onCountryChange={() => trigger(`addresses.${SHIPPING_ADDRESS_IDX}.postalCode`)}
                    disabled={isLoading}
                  />
                </Paper>
                <Grid item>
                  <CheckboxElement<RegistrationFormData>
                    name="shippingAsBilling"
                    label="Use as billing address"
                    disabled={isLoading}
                    onChange={() => setValue('defaultBillingAddressIdx', NO_IDX)}
                  />
                </Grid>
              </Grid>

              <Grid item xs={1} display={shippingAsBilling ? { xs: 'none' } : {}}>
                <Paper elevation={1} sx={{ m: 'auto', p: '1vh 2%', maxWidth: '900px', width: '100%' }}>
                  <UserAddressComponent
                    title={<FormLabel sx={{ pb: 2 }}>Billing address</FormLabel>}
                    addressIndex={BILLING_ADDRESS_IDX}
                    onCountryChange={() => trigger(`addresses.${BILLING_ADDRESS_IDX}.postalCode`)}
                    disabled={isLoading}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Grid container item spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1, md: 2 }} maxWidth="85vw">
              <Grid item xs={2}>
                <FormLabel sx={{ pb: 1 }}>Default addresses</FormLabel>
              </Grid>
              <Grid item xs={1}>
                <SelectElement<RegistrationFormData>
                  label="Default shipping address"
                  name="defaultShippingAddressIdx"
                  options={getShippingAddressOptions(addresses)}
                  helperText=" "
                  required
                  disabled={isLoading}
                  fullWidth
                />
              </Grid>
              <Grid item xs={1}>
                <SelectElement<RegistrationFormData>
                  label="Default billing address"
                  name="defaultBillingAddressIdx"
                  options={
                    shippingAsBilling ? getShippingAddressOptions(addresses) : getBillingAddressOptions(addresses)
                  }
                  helperText=" "
                  required
                  disabled={isLoading}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <LoadingButton
                loading={isLoading}
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mx: 'auto', textTransform: 'none' }}
                disabled={isLoading}
                size="large"
              >
                <HowToRegOutlinedIcon sx={{ mr: 1 }} />
                Sign Up
              </LoadingButton>
            </Grid>
          </Grid>
        </FormContainer>
      </Container>
    </Paper>
  );
}
