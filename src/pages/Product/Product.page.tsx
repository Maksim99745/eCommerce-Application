import { useGetProduct } from '@hooks/useGetProduct';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Dialog, Stack, Typography } from '@mui/material';
import ReactImageGallery from 'react-image-gallery';
import { useModalState } from '@hooks/useModalState';
import 'react-image-gallery/styles/scss/image-gallery.scss';

import styles from './Product.page.module.scss';
import { generateProductObj } from './utils/generateProductObj';

function ProductPage() {
  const { productKey = '' } = useParams<'productKey'>();
  const navigate = useNavigate();
  const { close, visible, show } = useModalState();
  const { data } = useGetProduct(productKey, {
    onError: () => {
      navigate('/404');
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
    <>
      <Dialog
        open={visible}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Dialog>
      <Stack className={styles.productPageContainer}>
        <Container className={styles.imageShortInfoContainer}>
          <Stack className={styles.imageGalleryContainer}>
            <ReactImageGallery
              showThumbnails={images.length > 1}
              showFullscreenButton={false}
              showPlayButton={false}
              items={images}
              onClick={() => {
                show();
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
            {'country' in productInfo && (
              <Typography component="p" className={styles.productPageInfo}>
                Country: <span className={styles.attributeValue}>{productInfo.country}</span>
              </Typography>
            )}
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
    </>
  );
}

export default ProductPage;
