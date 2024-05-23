import { Address, Customer } from '@commercetools/platform-sdk';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { AddressComponent } from './Address.component';

const isShippingAddress = (userData: Customer, address: Address): boolean => {
  if (!address.id || !userData.billingAddressIds) {
    return false;
  }
  return userData.shippingAddressIds?.includes(address.id) !== undefined;
};
const isBillingAddress = (userData: Customer, address: Address): boolean => {
  if (!address.id || !userData.billingAddressIds) {
    return false;
  }
  return userData.billingAddressIds.includes(address.id);
};
const isDefaultShippingAddress = (userData: Customer, address: Address): boolean =>
  address.id === userData.defaultShippingAddressId;
const isDefaultBillingAddress = (userData: Customer, address: Address): boolean =>
  address.id === userData.defaultBillingAddressId;
const isAnyDefaultAddress = (userData: Customer, address: Address): boolean =>
  address.id === userData.defaultBillingAddressId || address.id === userData.defaultShippingAddressId;

const DEFAULT_ADDRESS_ELEVATION = 5;

export function Addresses({ userData }: { userData: Customer }) {
  const { addresses } = userData;
  return (
    <Container maxWidth="md">
      <Paper elevation={1} sx={{ p: '2vh 3%', width: '100%' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Addresses information
        </Typography>
        <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 2 }}>
          {addresses?.map((address) => (
            <Grid item key={address.id} xs={1}>
              <Paper
                elevation={isAnyDefaultAddress(userData, address) ? DEFAULT_ADDRESS_ELEVATION : 1}
                sx={{ p: '2vh 4%', width: '100%' }}
              >
                <AddressComponent
                  country={address.country}
                  city={address.city || ''}
                  street={address.streetName || ''}
                  postalCode={address.postalCode || ''}
                  addressType="shipping"
                />
                <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
                  {(isDefaultShippingAddress(userData, address) && 'default shipping address') ||
                    (isShippingAddress(userData, address) && 'shipping address')}
                </Typography>
                <Typography variant="subtitle2">
                  {(isDefaultBillingAddress(userData, address) && 'default billing address') ||
                    (isBillingAddress(userData, address) && 'billing address')}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
