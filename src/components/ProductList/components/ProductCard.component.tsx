import { LineItem, ProductProjection } from '@commercetools/platform-sdk';
import CounterComponent from '@components/Counter/Counter.component';
import { productCurrencyMap } from '@constants/products.const';
import { useAddToCart } from '@core/api/hooks/useAddToCart';
import { useChangeCartItemQuantity } from '@core/api/hooks/useChangeCartItemQuantity';
import { useCart } from '@hooks/useCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useEventCallback,
} from '@mui/material';
import { mapProductToProductCard } from '@utils/map-product-to-product-card';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCardComponentProps {
  product: ProductProjection;
  productPath?: string;
}

export function ProductCardComponent({ product, productPath = '' }: ProductCardComponentProps) {
  const navigate = useNavigate();
  const { name, image, price, discounted, currency, description } = mapProductToProductCard(product);
  const { cart } = useCart();
  const [lineItem, setLineItem] = useState<LineItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { trigger: addToCartTrigger, isMutating: isAdding } = useAddToCart({ cart, productId: product.id });
  const { trigger: changeCartItemQuantity, isMutating: isQuantityChanging } = useChangeCartItemQuantity({
    cart,
    lineItemId: lineItem?.id,
  });

  const handleAddToCart = useEventCallback(() => addToCartTrigger({ quantity }));

  const handleChangeCount = useEventCallback((count: number) => {
    setQuantity(count);

    if (lineItem) {
      changeCartItemQuantity({ quantity: count });
    }
  });

  const handleGoToProduct = useEventCallback(() => navigate(`${productPath}products/${product.key}`));

  useEffect(
    () => setLineItem(cart?.lineItems.find((item) => item.productId === product.id) || null),
    [cart, product.id],
  );

  return (
    <Card sx={{ boxShadow: 3, height: 550 }}>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} onClick={handleGoToProduct}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ lineHeight: '1.2' }}>
              {name}
            </Typography>
          }
          sx={{
            height: '65px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          }}
        />

        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={name}
          sx={{ width: '90%', maxWidth: '300px', borderRadius: 6, border: 1, borderColor: 'grey.500' }}
        />

        <CardContent sx={{ px: 2, py: 0 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: '100px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: '5',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ px: 2, pt: 1, pb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
          <Stack>
            <Typography
              variant="body1"
              aria-label="product-price"
              sx={{
                textDecoration: discounted ? 'line-through' : 'none',
                color: discounted ? 'text.disabled' : 'inherit',
                fontWeight: discounted ? 'normal' : 'bold',
              }}
            >
              {price} {productCurrencyMap[currency]}
            </Typography>

            {!!discounted && (
              <Typography
                variant="body1"
                color="error"
                aria-label="product-discounted-price"
                sx={{ fontWeight: 'bold' }}
              >
                {discounted} {productCurrencyMap[currency]}
              </Typography>
            )}
          </Stack>

          <CounterComponent
            initCount={lineItem?.quantity || 1}
            onChange={handleChangeCount}
            disabled={isQuantityChanging}
            aria-label="product-counter"
          />

          <IconButton
            color="primary"
            onClick={handleAddToCart}
            aria-label="add-product-to-cart"
            disabled={!!lineItem || isAdding}
          >
            {isAdding ? <CircularProgress size={24} thickness={5} /> : <AddShoppingCartIcon />}
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}

const ProductCardMemoizedComponent = memo(ProductCardComponent);

export default ProductCardMemoizedComponent;
