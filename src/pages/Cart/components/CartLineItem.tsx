import { LineItem } from '@commercetools/platform-sdk';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
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
    <Grid key={cartItem.id} container>
      <Paper elevation={2} sx={{ p: '1vh 2%', width: '100%', m: 1 }}>
        <Grid columns={4} container spacing={1} alignItems="center">
          <Grid item xs={1}>
            <Box
              component="img"
              sx={{
                height: 90,
                width: 'fit-content',
                maxWidth: { xs: 150, md: 200 },
              }}
              alt={cartItem.name.en}
              src={imagePath}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography>{`${cartItem.name.en}`}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ m: 1 }} />
        <Grid
          key={cartItem.id}
          columns={4}
          spacing={{ xs: 1 }}
          container
          justifyContent="space-between"
          alignItems="centre"
        >
          <Grid item xs={1}>
            <Typography>&nbsp; {`amount: ${cartItem.quantity}`}</Typography>
          </Grid>
          <Grid item xs={2}>
            <CartLineItemPrice cartItem={cartItem} />
          </Grid>
          <Grid item xs={1}>
            <Button disabled={disabled} startIcon={<DeleteOutlineIcon />} onClick={() => onRemove(cartItem)}>
              Remove
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
