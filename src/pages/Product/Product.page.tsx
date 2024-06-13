import { useGetProduct } from '@core/api/hooks/useGetProduct';
import useProduct from '@hooks/useProduct';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
  useEventCallback,
} from '@mui/material';
import ReactImageGallery from 'react-image-gallery';
import { useModalState } from '@hooks/useModalState';
import ImageModal from '@pages/Product/components/ImageModal';
import styles from '@pages/Product/Product.page.module.scss';
import { useEffect, useState, useRef } from 'react';
import { LineItem, ProductVariant } from '@commercetools/platform-sdk';
import { getColorAttribute } from '@utils/get-color-attribute-value';
import { defaultProductImageUrl } from '@constants/products.const';
import { imagesUrls } from '@utils/map-selected-product-images';
import CounterComponent from '@components/Counter/Counter.component';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAddToCart } from '@core/api/hooks/useAddToCart';
import { useChangeCartItemQuantity } from '@core/api/hooks/useChangeCartItemQuantity';
import { useCart } from '@hooks/useCart';
import { generateProductObj } from './utils/generateProductObj';
import 'react-image-gallery/styles/scss/image-gallery.scss';

function ProductPage() {
  const { productKey = '' } = useParams<'productKey'>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { close, visible, show } = useModalState();
  const { data } = useGetProduct(productKey, { onError: () => navigate('/404') });
  const product = state?.product || '';
  const { setProduct, setProductLoading } = useProduct();
  const [selectedVariant, setSelectedVariant] = useState(data?.masterVariant);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);
  const imageGalleryRef = useRef<ReactImageGallery>(null);

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

  useEffect(() => {
    setProductLoading(true);

    if (data?.masterVariant) {
      setProduct(data);
      setSelectedVariant(data.masterVariant);
    }

    setLineItem(cart?.lineItems.find((item) => item.productId === product.id) || null);
  }, [data, setProduct, setProductLoading, cart, product.id]);

  const handleVariantClick = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  const handleImageClick = () => {
    const selectedImageIndex = imageGalleryRef.current?.getCurrentIndex() ?? 0;
    setClickedImageIndex(selectedImageIndex);
    show();
  };

  const productInfo = generateProductObj(data);
  const images = imagesUrls(selectedVariant);

  return (
    <>
      <ImageModal
        visible={visible}
        close={close}
        images={images}
        data={data}
        defaultImageUrl={defaultProductImageUrl}
        clickedImageIndex={clickedImageIndex}
      />
      <Stack className={styles.productPageContainer}>
        <Container className={styles.imageShortInfoContainer}>
          <Stack className={styles.imageGalleryContainer}>
            <ReactImageGallery
              ref={imageGalleryRef}
              showThumbnails={images.length > 1}
              showFullscreenButton={false}
              showPlayButton={false}
              items={images}
              onClick={handleImageClick}
              onErrorImageURL={defaultProductImageUrl}
              renderItem={(item) => (
                <img src={item.original} alt={productInfo.productName} className={styles.imageGalleryImage} />
              )}
            />
          </Stack>
          <Stack className={styles.shortInfoContainer}>
            <Typography component="h1" className={styles.productPageTitle}>
              {productInfo.productName}
            </Typography>
            {(!!productInfo.discountedPrice && (
              <Typography component="p" className={styles.productPageInfo}>
                Price: <span className={styles.currentPrice}>{productInfo.discountedPrice}</span>
                <span className={styles.previousPrice}>{productInfo.basePrice}</span>
              </Typography>
            )) ||
              (!!productInfo.basePrice && (
                <Typography component="p" className={styles.productPageInfo}>
                  Price: <span className={styles.currentPrice}>{productInfo.basePrice}</span>
                </Typography>
              ))}
            {!!productInfo.brand && (
              <Typography component="p" className={styles.productPageInfo}>
                Brand: <span className={styles.attributeValue}>{productInfo.brand}</span>
              </Typography>
            )}
            {!!productInfo.country && (
              <Typography component="p" className={styles.productPageInfo}>
                Country: <span className={styles.attributeValue}>{productInfo.country}</span>
              </Typography>
            )}
            {!!productInfo.material && (
              <Typography component="p" className={styles.productPageInfo}>
                Material: <span className={styles.attributeValue}>{productInfo.material}</span>
              </Typography>
            )}
            {!!selectedVariant && (
              <Typography component="p" className={styles.productPageInfo}>
                Color: <span className={styles.attributeValue}>{getColorAttribute(selectedVariant)}</span>
              </Typography>
            )}
            {!!data?.variants?.length && (
              <ButtonGroup
                variant="contained"
                aria-label="Basic button group"
                className={styles.variantButtonGroup}
                sx={{
                  '& .MuiButton-root': { border: '2px inset transparent' },
                }}
              >
                <Button
                  className={
                    selectedVariant?.id === data?.masterVariant.id ? styles.selectedVariantButton : styles.variantButton
                  }
                  key={data?.masterVariant.id}
                  variant="contained"
                  onClick={() => handleVariantClick(data?.masterVariant)}
                  sx={{
                    backgroundColor: `${getColorAttribute(data?.masterVariant)}`,
                    '&:hover': {
                      backgroundColor: `${getColorAttribute(data?.masterVariant)}`,
                    },
                  }}
                >
                  {getColorAttribute(data?.masterVariant)}
                </Button>
                {data?.variants.map((variant) => (
                  <Button
                    key={variant.id}
                    variant="contained"
                    onClick={() => handleVariantClick(variant)}
                    className={selectedVariant?.id === variant.id ? styles.selectedVariantButton : styles.variantButton}
                    sx={{
                      backgroundColor: getColorAttribute(variant),
                      '&:hover': {
                        backgroundColor: `${getColorAttribute(variant)}`,
                      },
                    }}
                  >
                    {getColorAttribute(variant)}
                  </Button>
                ))}
              </ButtonGroup>
            )}
            <Stack className={styles.productPageActions}>
              <CounterComponent
                initCount={lineItem?.quantity || 1}
                onChange={handleChangeCount}
                disabled={isQuantityChanging}
                aria-label="product-counter"
              />
              <IconButton
                className={styles.addBtn}
                size="large"
                color="primary"
                onClick={handleAddToCart}
                aria-label="add-product-to-cart"
                disabled={!!lineItem || isAdding}
              >
                {isAdding ? <CircularProgress size={24} thickness={5} /> : <AddShoppingCartIcon />}
              </IconButton>
            </Stack>
          </Stack>
        </Container>

        <Stack className={styles.productPageDescription}>
          <Typography component="p" className={styles.productPageDescription}>
            {data?.description?.en}
          </Typography>
          <Box className={styles.productAttributesContainer}>
            {!!productInfo.length && (
              <Typography component="p" className={styles.productAttributes}>
                Length: <span className={styles.attributeValue}>{productInfo.length} сm</span>
              </Typography>
            )}
            {!!productInfo.width && (
              <Typography component="p" className={styles.productAttributes}>
                Width: <span className={styles.attributeValue}>{productInfo.width} сm</span>
              </Typography>
            )}
            {!!productInfo.height && (
              <Typography component="p" className={styles.productAttributes}>
                Height: <span className={styles.attributeValue}>{productInfo.height} сm</span>
              </Typography>
            )}
            {!!productInfo.volume && (
              <Typography component="p" className={styles.productAttributes}>
                Volume: <span className={styles.attributeValue}>{productInfo.volume} lt</span>
              </Typography>
            )}
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

export default ProductPage;
