import { useCart } from '@hooks/useCart';
import { Container, Stack } from '@mui/material';
import { CartLineItemsView } from './components/CartLineItemsView';
import { useRemoveCartLineItem } from './hooks/useRemoveCartLineItem';
import { EmptyCartMessage } from './components/EmptyCartMessage';
import { CartToolBar } from './components/CartToolBar';
import { useCleanCart } from './hooks/useCleanCart';
import { useApplyPromoCode } from './hooks/useApplyPromoCode';

function CartPage() {
  const { cart } = useCart();

  const { trigger: handleLineItemRemove, loading: isRemoving } = useRemoveCartLineItem();
  const handleCleanCart = useCleanCart();
  const handleApplyPromoCode = useApplyPromoCode();

  if (!cart) {
    return <EmptyCartMessage />;
  }

  const isEmptyCart = cart.lineItems.length === 0;

  return (
    <Container maxWidth="md" disableGutters>
      <Stack sx={{ p: 0 }}>
        {!isEmptyCart && (
          <CartToolBar cartData={cart} onCleanCart={handleCleanCart} onApplyPromoCode={handleApplyPromoCode} />
        )}
        <CartLineItemsView cartData={cart} isLoading={isRemoving} onLineItemRemove={handleLineItemRemove} />
        {isEmptyCart && <EmptyCartMessage />}
      </Stack>
    </Container>
  );
}

export default CartPage;
