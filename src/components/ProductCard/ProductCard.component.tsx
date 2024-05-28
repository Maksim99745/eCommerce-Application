import { ProductProjection } from '@commercetools/platform-sdk';
import CounterComponent from '@components/Counter/Counter.component';
import { productCurrencyMap } from '@constants/products.const';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { mapProductToProductCard } from '@utils/map-product-to-product-card';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCardComponentProps {
  product: ProductProjection;
}

export function ProductCardComponent({ product }: ProductCardComponentProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { name, image, price, discounted, currency, description } = mapProductToProductCard(product);

  const handleAddToCart = () => {
    console.warn('Add to cart:', product);
  };

  const handleChangeCount = (count: number) => {
    console.warn('Change count:', count);
  };

  const handleGoToProduct = () => {
    navigate(`products/${product.key}`);
  };

  return (
    <Card sx={{ boxShadow: 3 }}>
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%', position: 'relative' }}
        >
          <Stack direction={isMediumScreen ? 'column' : 'row'}>
            {!!discounted && (
              <Typography
                variant="body1"
                color="darkgreen"
                aria-label="product-discounted-price"
                sx={{ fontWeight: 'bold', mr: '10px' }}
              >
                {discounted} {productCurrencyMap[currency]}
              </Typography>
            )}
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
          </Stack>

          <CounterComponent onChange={handleChangeCount} aria-label="product-counter" />

          <IconButton color="primary" onClick={handleAddToCart} aria-label="add-product-to-cart">
            <AddShoppingCartIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}

const ProductCardMemoizedComponent = memo(ProductCardComponent);

export default ProductCardMemoizedComponent;
