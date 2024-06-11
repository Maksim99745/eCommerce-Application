import { Cart } from '@commercetools/platform-sdk';
import { priceAmount, productCurrencyMap } from '@constants/products.const';
import { Container, Grid, Paper, Typography } from '@mui/material';

export function CartTotalCost({ cart }: { cart: Cart }) {
  const currencyCode = productCurrencyMap[cart.lineItems[0].price.value.currencyCode];
  return (
    <Container maxWidth="md" sx={{ position: 'sticky', top: '0', zIndex: 1 }}>
      <Grid container>
        <Paper
          elevation={2}
          sx={{
            p: '1vh 2%',
            width: '100%',
            m: 1,
          }}
        >
          <Typography variant="h6">
            Total price: {cart.totalPrice.centAmount / priceAmount} {currencyCode}
          </Typography>
        </Paper>
      </Grid>
    </Container>
  );
}
