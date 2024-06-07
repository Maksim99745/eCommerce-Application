import { useCart } from '@hooks/useCart';
import { CartLineItemsView } from './components/CartLineItemsView';
import { useRemoveCartLineItem } from './hooks/useRemoveCartLineItem';

function CartPage() {
  const { cart, isCartLoading } = useCart();

  const handleLineItemRemove = useRemoveCartLineItem();

  if (!cart) {
    return null;
  }

  return <CartLineItemsView cartData={cart} isLoading={isCartLoading} onLineItemRemove={handleLineItemRemove} />;
}

export default CartPage;
