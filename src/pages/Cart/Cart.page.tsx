import { useCart } from '@hooks/useCart';
import { CartProductsForm } from './components/CartProductsForm';

function CartPage() {
  const { cart, isCartLoading } = useCart();

  if (!cart) {
    return null;
  }

  return <CartProductsForm cartData={cart} isCartLoading={isCartLoading} />;
}

export default CartPage;
