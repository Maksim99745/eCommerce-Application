import { useCart } from '@hooks/useCart';
import { Stack } from '@mui/material';
import { CartLineItemsView } from './components/CartLineItemsView';
import { useRemoveCartLineItem } from './hooks/useRemoveCartLineItem';
import { EmptyCartMessage } from './components/EmptyCartMessage';
import { CartTotalCost } from './components/CartTotalCost';

function CartPage() {
  const { cart, isCartLoading } = useCart();

  const handleLineItemRemove = useRemoveCartLineItem();

  if (!cart) {
    return null;
  }

  const isEmptyCart = cart.lineItems.length === 0;

  return (
    <Stack sx={{ justifyContent: 'space-between', minHeight: '100%' }}>
      {!isEmptyCart && <CartTotalCost cart={cart} />}
      <CartLineItemsView cartData={cart} isLoading={isCartLoading} onLineItemRemove={handleLineItemRemove} />
      {isEmptyCart && <EmptyCartMessage />}
    </Stack>
  );
}

export default CartPage;
