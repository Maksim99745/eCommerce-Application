import { useGetProduct } from '@hooks/useGetProduct';
import { useParams } from 'react-router-dom';
import { Box, Container, Stack, Typography } from '@mui/material';
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

  const images = data?.masterVariant.images
    ? [...data.masterVariant.images, ...data.variants.flatMap((variant) => variant.images)].map((image) => ({
        original: image?.url || '',
        thumbnail: image?.url || '',
      }))
    : [];

  return (
    <Container className={styles.productPageContainer}>
      <Typography component="h1" className={styles.productPageTitle}>
        {data?.name.en}
      </Typography>
      <Box className={styles.imageGalleryContainer}>
        <ReactImageGallery
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={images}
          onClick={() => {
            // console.log(`TODO later a modal will be shown`, event);
          }}
          renderItem={(item) => <img src={item.original} alt="" className={styles.imageGalleryImage} />}
        />
      </Box>
      <Stack className={styles.productPageInfo}>
        <Typography component="p" className={styles.productPageDescription}>
          {data?.description?.en}
        </Typography>
      </Stack>
    </Container>
  );
}

export default ProductPage;
