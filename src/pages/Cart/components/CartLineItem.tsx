import { LineItem } from '@commercetools/platform-sdk';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Divider from '@mui/material/Divider';
import { CartLineItemPrice } from './CartLineItemPrice';

interface CartLineItemProps {
  cartItem: LineItem;
  disabled?: boolean;
  onRemove: (cartItem: LineItem) => void;
}

export function CartLineItem({ cartItem, disabled = false, onRemove }: CartLineItemProps) {
  const imagePath = cartItem?.variant?.images?.[0]?.url ?? '/public/defaultLineItemImage.jpeg';

  return (
    <Container maxWidth="md">
      <Grid key={cartItem.id} container>
        <Paper elevation={2} sx={{ p: '1vh 2%', width: '100%', m: 1 }}>
          <Grid columns={7} container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <Box
                component="img"
                sx={{
                  maxHeight: 100,
                }}
                alt={cartItem.name.en}
                src={imagePath}
              />
            </Grid>
            <Grid item xs={5}>
              <Typography>{`${cartItem.name.en}`}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ m: 1 }} />
          <Grid key={cartItem.id} columns={7} container alignItems="center">
            <Grid item xs={2}>
              <Typography>&nbsp;{`amount: ${cartItem.quantity}`}</Typography>
            </Grid>
            <Grid item xs={3}>
              <CartLineItemPrice cartItem={cartItem} />
            </Grid>
            <Grid item xs={2}>
              <Button disabled={disabled} startIcon={<DeleteOutlineIcon />} onClick={() => onRemove(cartItem)}>
                Remove
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}
