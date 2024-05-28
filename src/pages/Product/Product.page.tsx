import { useGetProduct } from '@hooks/useGetProduct';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, ButtonGroup, Container, Stack, Typography } from '@mui/material';
import ReactImageGallery from 'react-image-gallery';
import { useModalState } from '@hooks/useModalState';
import ImageModal from '@pages/Product/components/ImageModal';
import styles from '@pages/Product/Product.page.module.scss';
import { SetStateAction, useState } from 'react';
import { ProductVariant } from '@commercetools/platform-sdk';
import { generateProductObj } from './utils/generateProductObj';
import 'react-image-gallery/styles/scss/image-gallery.scss';

function ProductPage() {
  const { productKey = '' } = useParams<'productKey'>();
  const navigate = useNavigate();
  const { close, visible, show } = useModalState();
  const { data } = useGetProduct(productKey, {
    onError: () => {
      navigate('/404');
    },
  });
  const [selectedVariant, setSelectedVariant] = useState(data?.masterVariant);
  const handleVariantClick = (variant: SetStateAction<ProductVariant | undefined>) => {
    setSelectedVariant(variant);
  };
  const getColorAttribute = (variant: ProductVariant) =>
    variant.attributes?.find((attr) => attr.name === 'color')?.value || 'primary';

  const productInfo = generateProductObj(data);
  // console.log(`data`, data);
  // console.log(`productInfo`, productInfo);
  const defaultImageUrl = '/public/defaultImg.png';
  const images = data?.masterVariant.images
    ? [...data.masterVariant.images].map((image) => ({
        original: image?.url || defaultImageUrl,
        thumbnail: image?.url || defaultImageUrl,
      }))
    : [];

  return (
    <>
      <ImageModal visible={visible} close={close} images={images} data={data} defaultImageUrl={defaultImageUrl} />
      <Stack className={styles.productPageContainer}>
        <Container className={styles.imageShortInfoContainer}>
          <Stack className={styles.imageGalleryContainer}>
            <ReactImageGallery
              showThumbnails={images.length > 1}
              showFullscreenButton={false}
              showPlayButton={false}
              items={images}
              onClick={show}
              onErrorImageURL={defaultImageUrl}
              renderItem={(item) => (
                <img src={item.original} alt={data?.name.en} className={styles.imageGalleryImage} />
              )}
            />
          </Stack>
          <Stack className={styles.shortInfoContainer}>
            <Typography component="h1" className={styles.productPageTitle}>
              {data?.name.en}
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
            {!!productInfo.color && (
              <Typography component="p" className={styles.productPageInfo}>
                Color: <span className={styles.attributeValue}>{productInfo.color}</span>
              </Typography>
            )}
            {!!data?.variants?.length && (
              <ButtonGroup
                variant="contained"
                aria-label="Basic button group"
                className={styles.variantButtonGroup}
                sx={{ '& .MuiButton-root': { border: 'none' }, '& .MuiButton-root.Mui-disabled': { border: 'none' } }}
              >
                <Button
                  key={data?.masterVariant.id}
                  variant="contained"
                  sx={{
                    border: 'none',
                    backgroundColor: `${data?.masterVariant.attributes?.find((attr) => attr.name === 'color')?.value}`,
                    textTransform: 'capitalize',
                  }}
                >
                  {data?.masterVariant.attributes?.find((attr) => attr.name === 'color')?.value}
                </Button>
                {data?.variants.map((variant) => (
                  <Button
                    key={variant.id}
                    variant="contained"
                    onClick={() => handleVariantClick(variant)}
                    className={selectedVariant?.id === variant.id ? styles.activeVariantButton : ''}
                    sx={{
                      backgroundColor: getColorAttribute(variant),
                      color: 'white',
                      textTransform: 'capitalize',
                      textShadow: 'rgb(0, 0, 0) 0 0 3px',
                    }}
                  >
                    {getColorAttribute(variant)}
                  </Button>
                ))}
              </ButtonGroup>
            )}
            <Typography component="p" className={styles.productPageInfo}>
              Buttons &quot;Add to Cart&quot;/&quot;Remove from Cart&quot; 🛒 will be here later
            </Typography>
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
