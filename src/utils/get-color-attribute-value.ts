import { Attribute, ProductVariant } from '@commercetools/platform-sdk';

export const getColorAttribute = (variant: ProductVariant): string =>
  variant.attributes?.find((attr: Attribute) => attr.name === 'color')?.value || 'primary';
