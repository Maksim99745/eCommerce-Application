import {
  BILLING_ADDRESS_IDX,
  defaultCountryOption,
  NO_IDX,
  SHIPPING_ADDRESS_IDX,
} from '@core/validation/user-registration/user-registration.const';
import { RegistrationForm, RegistrationFormAddress } from '@models/index';
import { LoadingButton } from '@mui/lab';
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
  useForm,
  CheckboxElement,
  useWatch,
  SelectElement,
} from 'react-hook-form-mui';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container, FormLabel, Grid, Paper, Typography } from '@mui/material';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '@core/validation/user-registration/user-registration.schema';
import { DatePickerElement } from '@components/DataPickerElement/DatePickerElement';
import { UserAddressComponent } from './UserAddress.component';

export interface RegistrationFormProps {
  onSubmit: (registrationData: RegistrationForm) => void;
  isLoading: boolean;
}

const toAddressString = (address: RegistrationFormAddress): string =>
  [address.country, address.postalCode, address.city, address.street].filter(Boolean).join(', ');

const withTypeOfAddress = (addressType: RegistrationFormAddress['addressType']) => (address: RegistrationFormAddress) =>
  address.addressType === addressType;

const useAddressRenderOptions = (addressType: RegistrationFormAddress['addressType']) =>
  useCallback(
    (addresses: RegistrationFormAddress[]) => [
      { id: NO_IDX, label: 'None' },
      ...addresses
        .map((address, index) => ({
          ...address,
          id: index,
          label: (
            <Typography sx={{ textWrap: 'pretty', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {toAddressString(address)}
            </Typography>
          ),
        }))
        .filter(withTypeOfAddress(addressType)),
    ],
    [addressType],
  );

export function RegistrationFormComponent({ onSubmit, isLoading }: RegistrationFormProps) {
  const formContext = useForm<RegistrationForm>({
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
        { street: '', city: '', country: defaultCountryOption.id, postalCode: '', addressType: 'shipping' },
        { street: '', city: '', country: defaultCountryOption.id, postalCode: '', addressType: 'billing' },
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
        <FormContainer<RegistrationForm> formContext={formContext} onSuccess={onSubmit}>
          <Grid container spacing={1} columns={1}>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Sign Up
              </Typography>
            </Grid>

            <Grid container item spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1, md: 2 }}>
              <Grid item xs={1}>
                <TextFieldElement<RegistrationForm>
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
                <PasswordElement<RegistrationForm>
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
                <TextFieldElement<RegistrationForm>
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
                <TextFieldElement<RegistrationForm>
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
                    title="Shipping address"
                    addressIndex={SHIPPING_ADDRESS_IDX}
                    onCountryChange={() => trigger(`addresses.${SHIPPING_ADDRESS_IDX}.postalCode`)}
                    disabled={isLoading}
                  />
                </Paper>
                <Grid item>
                  <CheckboxElement<RegistrationForm>
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
                    title="Billing address"
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
                <SelectElement<RegistrationForm>
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
                <SelectElement<RegistrationForm>
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
