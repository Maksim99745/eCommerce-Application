import { useGetProduct } from '@hooks/useGetProduct';
import { useParams } from 'react-router-dom';
import { Container, Stack, Typography } from '@mui/material';
import ReactImageGallery from 'react-image-gallery';
import { isErrorWithBody } from '@core/errorHandlers/ErrorWithBody';
import { isResourceNotFoundError } from '@core/errorHandlers/errors';
import { useShowMessage } from '@hooks/useShowMessage';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import styles from './Product.page.module.scss';

function ProductPage() {
  const { productKey = '' } = useParams<'productKey'>();
  const showMessage = useShowMessage();
  const { data } = useGetProduct(productKey, {
    onError: (e) => {
      if (isErrorWithBody(e) && isResourceNotFoundError(e.body.errors[0])) {
        // TODO: createErrorMessage
        showMessage('The Product not found', 'error');
      }
    },
  });
  // console.log(data);
  // console.log(`${data?.masterVariant?.prices[0].value.centAmount / 100} €`);

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
            Price:
          </Typography>
          <Typography component="p" className={styles.productPageInfo}>
            Brand:
          </Typography>
          <Typography component="p" className={styles.productPageInfo}>
            Country:
          </Typography>
          <Typography component="p" className={styles.productPageInfo}>
            Variants
          </Typography>
        </Stack>
      </Container>

      <Stack className={styles.productPageDescription}>
        <Typography component="p" className={styles.productPageDescription}>
          {data?.description?.en}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ProductPage;
