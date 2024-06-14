import CounterComponent from '@components/Counter/Counter.component';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useAddToCart } from '@core/api/hooks/useAddToCart';
import { useChangeCartItemQuantity } from '@core/api/hooks/useChangeCartItemQuantity';
import { useCart } from '@hooks/useCart';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton, useEventCallback } from '@mui/material';
import { LineItem } from '@commercetools/platform-sdk';
import { useRemoveCartLineItem } from '@pages/Cart/hooks/useRemoveCartLineItem';

interface AddToCartProps {
  productId: string;
  // variantId?: string;
  // showAddButton?: boolean;
}

export default function AddToCartComponent({ productId }: AddToCartProps) {
  const { cart, isCartLoading } = useCart();
  const [lineItem, setLineItem] = useState<LineItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { trigger: addToCartTrigger, isMutating: isAdding } = useAddToCart({ cart, productId });
  const { trigger: changeCartItemQuantity, isMutating: isQuantityChanging } = useChangeCartItemQuantity({
    cart,
    lineItemId: lineItem?.id,
  });

  const handleAddToCart = useEventCallback(() => addToCartTrigger({ quantity }));
  const handleRemoveFromCart = useRemoveCartLineItem();
  const handleChangeCount = useEventCallback((count: number) => {
    setQuantity(count);

    if (lineItem) {
      changeCartItemQuantity({ quantity: count });
    }
  });

  useEffect(() => {
    setLineItem(cart?.lineItems.find((item) => item.productId === productId) || null);
  }, [cart, productId]);

  return (
    <>
      <CounterComponent
        initCount={lineItem?.quantity || 1}
        onChange={handleChangeCount}
        disabled={isQuantityChanging}
        aria-label="product-counter"
      />
      <Box>
        <IconButton
          size="large"
          color="primary"
          onClick={handleAddToCart}
          aria-label="add-product-to-cart"
          disabled={!!lineItem}
        >
          {isAdding ? <CircularProgress size={24} thickness={5} /> : <AddShoppingCartIcon />}
        </IconButton>
        <IconButton
          size="large"
          color="primary"
          onClick={() => {
            if (lineItem) {
              handleRemoveFromCart(lineItem);
            }
          }}
          aria-label="remove-product-from-cart"
          disabled={!lineItem}
        >
          {isCartLoading ? <CircularProgress size={24} thickness={5} /> : <RemoveShoppingCartIcon />}
        </IconButton>
      </Box>
    </>
  );
}
