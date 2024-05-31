import { ProductVariant } from '@commercetools/platform-sdk';
import { defaultProductImageUrl } from '@constants/products.const';

export const imagesUrls = (selectedVariant: ProductVariant | undefined) =>
  selectedVariant?.images
    ? [...selectedVariant.images].map((image) => ({
        original: image?.url || defaultProductImageUrl,
        thumbnail: image?.url || defaultProductImageUrl,
      }))
    : [];
