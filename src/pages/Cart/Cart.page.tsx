import { useCart } from '@hooks/useCart';
import { Stack } from '@mui/material';
import { CartLineItemsView } from './components/CartLineItemsView';
import { useRemoveCartLineItem } from './hooks/useRemoveCartLineItem';
import { EmptyCartMessage } from './components/EmptyCartMessage';
import { CartToolBar } from './components/CartToolBar';
import { useCleanCart } from './hooks/useCleanCart';

function CartPage() {
  const { cart, isCartLoading } = useCart();

  const handleLineItemRemove = useRemoveCartLineItem();
  const handleCleanCart = useCleanCart();

  if (!cart) {
    return <EmptyCartMessage />;
  }

  const isEmptyCart = cart.lineItems.length === 0;

  return (
    <Stack sx={{ minHeight: '100%' }}>
      {!isEmptyCart && <CartToolBar cartData={cart} onCleanCart={handleCleanCart} />}
      <CartLineItemsView cartData={cart} isLoading={isCartLoading} onLineItemRemove={handleLineItemRemove} />
      {isEmptyCart && <EmptyCartMessage />}
    </Stack>
  );
}

export default CartPage;
