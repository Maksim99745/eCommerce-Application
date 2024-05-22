import { Customer } from '@commercetools/platform-sdk';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Address } from './Address.component';

export function Addresses({ userData }: { userData: Customer }) {
  const { addresses } = userData;
  return (
    <Container maxWidth="md">
      <Paper elevation={1} sx={{ p: '1vh 2%', width: '100%', m: 1 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Addresses information
        </Typography>
        <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 4 }}>
          {addresses?.map((address) => (
            <Grid item key={address.city} xs={1}>
              <Address
                country={address.country}
                city={address.city || ''}
                street={address.streetName || ''}
                postalCode={address.postalCode || ''}
                addressType="shipping"
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
