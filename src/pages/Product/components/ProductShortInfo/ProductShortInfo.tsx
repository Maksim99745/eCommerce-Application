import { Stack, Typography } from '@mui/material';
import { getColorAttribute } from '@utils/get-color-attribute-value';
import { ProductVariant } from '@commercetools/platform-sdk';
import styles from './ProductShortInfo.module.scss';

export default function ProductShortInfo({
  productInfo,
  selectedVariant,
}: {
  productInfo: Record<string, string>;
  selectedVariant: ProductVariant | undefined;
}) {
  const { productName, discountedPrice, basePrice, brand, material, country } = productInfo;
  return (
    <Stack sx={{ mb: '30px' }}>
      <Typography component="h1" className={styles.productPageTitle}>
        {productName}
      </Typography>
      {(!!discountedPrice && (
        <Typography component="p" className={styles.productPageInfo}>
          Price: <span className={styles.currentPrice}>{discountedPrice}</span>
          <span className={styles.previousPrice}>{basePrice}</span>
        </Typography>
      )) ||
        (!!basePrice && (
          <Typography component="p" className={styles.productPageInfo}>
            Price: <span className={styles.currentPrice}>{basePrice}</span>
          </Typography>
        ))}
      {!!brand && (
        <Typography component="p" className={styles.productPageInfo}>
          Brand: <span className={styles.attributeValue}>{brand}</span>
        </Typography>
      )}
      {!!country && (
        <Typography component="p" className={styles.productPageInfo}>
          Country: <span className={styles.attributeValue}>{country}</span>
        </Typography>
      )}
      {!!material && (
        <Typography component="p" className={styles.productPageInfo}>
          Material: <span className={styles.attributeValue}>{material}</span>
        </Typography>
      )}
      {!!selectedVariant && (
        <Typography component="p" className={styles.productPageInfo}>
          Color: <span className={styles.attributeValue}>{getColorAttribute(selectedVariant)}</span>
        </Typography>
      )}
    </Stack>
  );
}
