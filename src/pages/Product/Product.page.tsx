import { useGetProduct } from '@hooks/useGetProduct';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Stack, Typography } from '@mui/material';
import ReactImageGallery from 'react-image-gallery';
import { useShowMessage } from '@hooks/useShowMessage';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import styles from './Product.page.module.scss';
import { generateProductObj } from './utils/generateProductObj';

function ProductPage() {
  const { productKey = '' } = useParams<'productKey'>();
  const showMessage = useShowMessage();
  const navigate = useNavigate();
  const { data } = useGetProduct(productKey, {
    onError: (e) => {
      showMessage(createAppErrorMessage(e), 'error');
      navigate('/');
    },
  });

  const productInfo = generateProductObj(data);

  const defaultImageUrl = '/public/defaultImg.png';
  const images = data?.masterVariant.images
    ? [...data.masterVariant.images].map((image) => ({
        original: image?.url || defaultImageUrl,
        thumbnail: image?.url || defaultImageUrl,
      }))
    : [];

  return (
    <Stack className={styles.productPageContainer}>
      <Container className={styles.imageShortInfoContainer}>
        <Stack className={styles.imageGalleryContainer}>
          <ReactImageGallery
            showThumbnails={images.length > 1}
            showFullscreenButton={false}
            showPlayButton={false}
            items={images}
            onClick={() => {
              // console.log(`TODO later a modal will be shown`, event);
            }}
            onErrorImageURL={defaultImageUrl}
            renderItem={(item) => <img src={item.original} alt="" className={styles.imageGalleryImage} />}
          />
        </Stack>
        <Stack className={styles.shortInfoContainer}>
          <Typography component="h1" className={styles.productPageTitle}>
            {data?.name.en}
          </Typography>
          <Typography component="p" className={styles.productPageInfo}>
            Price: <span className={styles.currentPrice}>{productInfo.currentPrice}</span>
            <span className={styles.previousPrice}>{productInfo.previousPrice}</span>
          </Typography>
          <Typography component="p" className={styles.productPageInfo}>
            Brand: <span className={styles.attributeValue}>{productInfo.brand}</span>
          </Typography>
          <Typography component="p" className={styles.productPageInfo}>
            Country: <span className={styles.attributeValue}>{productInfo.country}</span>
          </Typography>
          <Typography component="p" className={styles.productPageInfo}>
            Variants will be here later, if any
          </Typography>
          <Typography component="p" className={styles.productPageInfo}>
            Buttons &quot;Add to Cart&quot;/&quot;Remove from Cart&quot; 🛒 will be here later
          </Typography>
        </Stack>
      </Container>

      <Stack className={styles.productPageDescription}>
        <Typography component="p" className={styles.productPageDescription}>
          {data?.description?.en}
        </Typography>
        <Typography component="p" className={styles.productAttributes}>
          {productInfo.lengthInfo}
        </Typography>
        <Typography component="p" className={styles.productAttributes}>
          {productInfo.widthInfo}
        </Typography>
        <Typography component="p" className={styles.productAttributes}>
          {productInfo.heightInfo}
        </Typography>
        <Typography component="p" className={styles.productAttributes}>
          {productInfo.volumeInfo}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ProductPage;
