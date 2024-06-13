import { useGetProduct } from '@core/api/hooks/useGetProduct';
import useProduct from '@hooks/useProduct';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, CircularProgress, Container, IconButton, Stack, useEventCallback } from '@mui/material';
import ReactImageGallery from 'react-image-gallery';
import { useModalState } from '@hooks/useModalState';
import ImageModal from '@pages/Product/components/ImageModalComponent/ImageModal';
import styles from '@pages/Product/Product.page.module.scss';
import { useEffect, useState, useRef } from 'react';
import { LineItem, ProductVariant } from '@commercetools/platform-sdk';
import { getColorAttribute } from '@utils/get-color-attribute-value';
import { defaultProductImageUrl } from '@constants/products.const';
import { imagesUrls } from '@utils/map-selected-product-images';
import CounterComponent from '@components/Counter/Counter.component';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useAddToCart } from '@core/api/hooks/useAddToCart';
import { useChangeCartItemQuantity } from '@core/api/hooks/useChangeCartItemQuantity';
import { useCart } from '@hooks/useCart';
import { generateProductObj } from './utils/generateProductObj';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import ProductShortInfo from './components/ProductShortInfo/ProductShortInfo';
import ProductDescription from './components/ProductDescription/ProductDescription';

function ProductPage() {
  const { productKey = '' } = useParams<'productKey'>();
  const navigate = useNavigate();
  const { close, visible, show } = useModalState();
  const { data: { id, masterData: { current } } = { id: '', masterData: { current: undefined } } } = useGetProduct(
    productKey,
    { onError: () => navigate('/404') },
  );
  const { setProduct, setProductLoading } = useProduct();
  const [selectedVariant, setSelectedVariant] = useState(current?.masterVariant);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);
  const imageGalleryRef = useRef<ReactImageGallery>(null);

  const { cart } = useCart();
  const [lineItem, setLineItem] = useState<LineItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { trigger: addToCartTrigger, isMutating: isAdding } = useAddToCart({ cart, productId: id });
  const { trigger: changeCartItemQuantity, isMutating: isQuantityChanging } = useChangeCartItemQuantity({
    cart,
    lineItemId: lineItem?.id,
  });

  const handleAddToCart = useEventCallback(() => addToCartTrigger({ quantity }));
  // TODO implement handleRemoveFromCart function
  const handleRemoveFromCart = useEventCallback(() => addToCartTrigger({ quantity }));

  const handleChangeCount = useEventCallback((count: number) => {
    setQuantity(count);

    if (lineItem) {
      changeCartItemQuantity({ quantity: count });
    }
  });

  useEffect(() => {
    setProductLoading(true);

    if (current?.masterVariant) {
      setProduct(current);
      setSelectedVariant(current.masterVariant);
    }

    setLineItem(cart?.lineItems.find((item) => item.productId === id) || null);
  }, [current, setProduct, setProductLoading, cart, id]);

  const handleVariantClick = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  const handleImageClick = () => {
    const selectedImageIndex = imageGalleryRef.current?.getCurrentIndex() ?? 0;
    setClickedImageIndex(selectedImageIndex);
    show();
  };

  const productInfo = generateProductObj(current);
  const images = imagesUrls(selectedVariant);

  return (
    <>
      <ImageModal
        visible={visible}
        close={close}
        images={images}
        data={current}
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
            <ProductShortInfo productInfo={productInfo} selectedVariant={selectedVariant} />

            {!!current?.variants?.length && (
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
                    selectedVariant?.id === current?.masterVariant.id
                      ? styles.selectedVariantButton
                      : styles.variantButton
                  }
                  key={current?.masterVariant.id}
                  variant="contained"
                  onClick={() => handleVariantClick(current?.masterVariant)}
                  sx={{
                    backgroundColor: `${getColorAttribute(current?.masterVariant)}`,
                    '&:hover': {
                      backgroundColor: `${getColorAttribute(current?.masterVariant)}`,
                    },
                  }}
                >
                  {getColorAttribute(current?.masterVariant)}
                </Button>
                {current?.variants.map((variant) => (
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
              {lineItem ? (
                <IconButton
                  className={styles.addBtn}
                  size="large"
                  color="primary"
                  onClick={handleRemoveFromCart}
                  aria-label="remove-product-from-cart"
                  // TODO implement isInProcess variable
                  disabled={isAdding}
                >
                  {isAdding ? <CircularProgress size={24} thickness={5} /> : <RemoveShoppingCartIcon />}
                </IconButton>
              ) : (
                <IconButton
                  className={styles.addBtn}
                  size="large"
                  color="primary"
                  onClick={handleAddToCart}
                  aria-label="add-product-to-cart"
                  disabled={isAdding}
                >
                  {isAdding ? <CircularProgress size={24} thickness={5} /> : <AddShoppingCartIcon />}
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Container>
        <ProductDescription productInfo={productInfo} current={current} />
      </Stack>
    </>
  );
}

export default ProductPage;
