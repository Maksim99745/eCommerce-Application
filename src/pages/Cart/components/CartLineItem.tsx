import { Cart, LineItem } from '@commercetools/platform-sdk';
import { Box, Button, CardActionArea, Container, Grid, Paper, Typography, useEventCallback } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Divider from '@mui/material/Divider';
import CounterComponent from '@components/Counter/Counter.component';
import { useChangeCartItemQuantity } from '@core/api/hooks/useChangeCartItemQuantity';
import { useNavigate } from 'react-router-dom';
import { defaultProductImageUrl } from '@constants/products.const';
import { CartLineItemPrice } from './CartLineItemPrice';

interface CartLineItemProps {
  cart: Cart;
  lineItem: LineItem;
  disabled?: boolean;
  onRemove: (lineItem: LineItem) => void;
}

export function CartLineItem({ cart, lineItem, disabled = false, onRemove }: CartLineItemProps) {
  const navigate = useNavigate();
  const imagePath = lineItem?.variant?.images?.[0]?.url ?? defaultProductImageUrl;

  const { trigger: changeCartItemQuantity, isMutating: isQuantityChanging } = useChangeCartItemQuantity({
    cart,
    lineItemId: lineItem?.id,
  });

  const handleChangeCount = useEventCallback((count: number) => {
    if (lineItem) {
      changeCartItemQuantity({ quantity: count });
    }
  });

  const handleGoToProduct = useEventCallback(() => navigate(`/products/${lineItem.productKey}`));

  return (
    <Container maxWidth="md">
      <Grid key={lineItem.id} container>
        <Paper elevation={2} sx={{ p: '1vh 2%', width: '100%', m: 1 }}>
          <CardActionArea onClick={handleGoToProduct}>
            <Grid columns={7} container spacing={1} alignItems="center">
              <Grid item xs={2}>
                <Box
                  component="img"
                  sx={{
                    maxHeight: 100,
                  }}
                  alt={lineItem.name.en}
                  src={imagePath}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography>{`${lineItem.name.en}`}</Typography>
              </Grid>
            </Grid>
          </CardActionArea>

          <Divider sx={{ m: 1 }} />
          <Grid key={lineItem.id} columns={7} container alignItems="center">
            <Grid item xs={2}>
              <CounterComponent
                initCount={lineItem?.quantity || 1}
                onChange={handleChangeCount}
                disabled={isQuantityChanging || disabled}
                aria-label="product-counter"
              />
            </Grid>
            <Grid item xs={3}>
              <CartLineItemPrice cartItem={lineItem} />
            </Grid>
            <Grid item xs={2}>
              <Button disabled={disabled} startIcon={<DeleteOutlineIcon />} onClick={() => onRemove(lineItem)}>
                Remove
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}
