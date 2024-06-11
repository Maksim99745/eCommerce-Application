import { useCart } from '@hooks/useCart';
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
    <>
      <CartLineItemsView cartData={cart} isLoading={isCartLoading} onLineItemRemove={handleLineItemRemove} />
      {isEmptyCart && <EmptyCartMessage />}
      {!isEmptyCart && <CartTotalCost cart={cart} />}
    </>
  );
}

export default CartPage;
