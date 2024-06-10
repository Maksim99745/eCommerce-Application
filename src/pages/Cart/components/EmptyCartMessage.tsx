import { Box, Button, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

export function EmptyCartMessage() {
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100%', textAlign: 'center', mt: 1 }}
    >
      <Grid item xs={1}>
        <Typography variant="h4">
          Your cart is currently empty, look at our catalog to learn more about our products.
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Button
          component={Link}
          to="/catalog"
          startIcon={<ShoppingCartIcon />}
          size="large"
          variant="outlined"
          color="primary"
        >
          Catalog
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Box
          component="img"
          sx={{
            width: { xs: '80%', sm: '70%', md: '50%', lg: '40%' },
            mt: 4,
          }}
          alt="Your cart is empty"
          src="/public/emptyCartImage.png"
        />
      </Grid>
    </Grid>
  );
}
