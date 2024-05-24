import { ProductData } from '@commercetools/platform-sdk';

type Attributes = {
  [key: string]: string;
};
const CENTS = 100;

export function generateProductObj(data: ProductData | undefined): Attributes {
  const productInfo: Attributes = {};

  if (data?.masterVariant?.attributes) {
    data.masterVariant.attributes.forEach((attribute) => {
      productInfo[attribute.name] = attribute.value;
    });
    productInfo.lengthInfo = productInfo.length ? `Length: ${productInfo.length} cm` : '';
    productInfo.widthInfo = productInfo.width ? `Width: ${productInfo.width} cm` : '';
    productInfo.heightInfo = productInfo.height ? `Height: ${productInfo.height} cm` : '';
    productInfo.volumeInfo = productInfo.volume ? `Volume: ${productInfo.volume} lt` : '';
  }

  if (data && data.masterVariant.prices) {
    if (data.masterVariant.prices[0].value.centAmount) {
      productInfo.basePrice = `${data.masterVariant.prices[0].value.centAmount / CENTS} €`;
    }
    if (data.masterVariant.prices[0].discounted && data.masterVariant.prices[0].discounted.value.centAmount) {
      productInfo.discountedPrice = `${data.masterVariant.prices[0].discounted.value.centAmount / CENTS} €`;
    }
    productInfo.currentPrice = productInfo.discountedPrice || productInfo.basePrice;
    productInfo.previousPrice = productInfo.discountedPrice ? productInfo.basePrice : '';
  }
  return productInfo;
}
