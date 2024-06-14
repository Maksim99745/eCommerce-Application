import { Box, Stack, Typography } from '@mui/material';
import { ProductData } from '@commercetools/platform-sdk';
import styles from './ProductDescription.module.scss';

export default function ProductDescription({
  productInfo,
  current,
}: {
  productInfo: Record<string, string>;
  current: ProductData | undefined;
}) {
  return (
    <Stack className={styles.productPageDescription}>
      <Typography component="p" className={styles.productPageDescription}>
        {current?.description?.en}
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
  );
}
