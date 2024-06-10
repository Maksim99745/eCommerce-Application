import { Cart } from '@commercetools/platform-sdk';
import { Container, Grid, Paper, Typography } from '@mui/material';

export function CartTotalCost({ cart }: { cart: Cart }) {
  return (
    <Container maxWidth="md" sx={{ m: 'auto' }}>
      <Grid container>
        <Paper elevation={2} sx={{ p: '1vh 2%', width: '100%', m: 1 }}>
          <Grid columns={2} container>
            <Grid item />
            <Typography>
              Total price: {cart.totalPrice.centAmount} {cart.totalPrice.currencyCode}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}
