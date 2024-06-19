import CounterComponent from '@components/Counter/Counter.component';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddToCart } from '@core/api/hooks/useAddToCart';
import { useChangeCartItemQuantity } from '@core/api/hooks/useChangeCartItemQuantity';
import { useCart } from '@hooks/useCart';
import { useEffect, useState } from 'react';
import { CircularProgress, IconButton, useEventCallback } from '@mui/material';
import { LineItem } from '@commercetools/platform-sdk';
import { useRemoveCartLineItem } from '@pages/Cart/hooks/useRemoveCartLineItem';
import { minCount } from '@constants/products.const';

interface AddToCartProps {
  productId: string;
  variantId?: number;
}

export default function AddRemoveProduct({ productId, variantId }: AddToCartProps) {
  const { cart } = useCart();
  const [lineItem, setLineItem] = useState<LineItem | null>(null);
  const [quantity, setQuantity] = useState(minCount);
  const { trigger: addToCartTrigger, isMutating: isAdding } = useAddToCart({ cart, productId, variantId });
  const { trigger: changeCartItemQuantity, isMutating: isQuantityChanging } = useChangeCartItemQuantity({
    cart,
    lineItemId: lineItem?.id,
  });

  const handleAddToCart = useEventCallback(() => addToCartTrigger({ quantity }));
  const { trigger: handleRemoveFromCart, loading: isRemoving } = useRemoveCartLineItem();
  const handleChangeCount = useEventCallback((count: number) => {
    setQuantity(count);

    if (lineItem) {
      changeCartItemQuantity({ quantity: count });
    }
  });

  useEffect(() => {
    setLineItem(cart?.lineItems.find((item) => item.productId === productId && item.variant.id === variantId) || null);
  }, [cart, productId, variantId]);

  return (
    <>
      <CounterComponent
        initCount={lineItem?.quantity || minCount}
        onChange={handleChangeCount}
        disabled={isQuantityChanging}
        aria-label="product-counter"
      />
      {lineItem ? (
        <IconButton
          size="large"
          color="primary"
          onClick={() => {
            handleRemoveFromCart(lineItem);
            setQuantity(minCount);
          }}
          aria-label="remove-product-from-cart"
          disabled={!lineItem || isRemoving || isQuantityChanging}
        >
          {isRemoving ? <CircularProgress size={35} thickness={5} /> : <DeleteIcon fontSize="large" color="error" />}
        </IconButton>
      ) : (
        <IconButton
          size="large"
          color="primary"
          onClick={handleAddToCart}
          aria-label="add-product-to-cart"
          disabled={!!lineItem || isAdding}
        >
          {isAdding ? (
            <CircularProgress size={35} thickness={5} />
          ) : (
            <AddShoppingCartIcon fontSize="large" color="success" />
          )}
        </IconButton>
      )}
    </>
  );
}
