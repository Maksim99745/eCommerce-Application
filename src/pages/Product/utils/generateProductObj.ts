import { ProductData } from '@commercetools/platform-sdk';
import { priceAmount, productCurrencyMap } from '@constants/products.const';

export function generateProductObj(data: ProductData | undefined): Record<string, string> {
  const productInfo: Record<string, string> = {};

  if (data?.masterVariant?.attributes) {
    data.masterVariant.attributes.forEach((attribute) => {
      productInfo[attribute.name] = String(attribute.value);
    });

    // productInfo.lengthInfo = productInfo.length ? `Length: ${productInfo.length} cm` : '';
    // productInfo.widthInfo = productInfo.width ? `Width: ${productInfo.width} cm` : '';
    // productInfo.heightInfo = productInfo.height ? `Height: ${productInfo.height} cm` : '';
    // productInfo.volumeInfo = productInfo.volume ? `Volume: ${productInfo.volume} lt` : '';
  }

  if (data?.masterVariant.prices) {
    if (data.masterVariant.prices[0].value.centAmount) {
      productInfo.basePrice = `${data.masterVariant.prices[0].value.centAmount / priceAmount} ${productCurrencyMap.EUR}`;
    }
    if (data.masterVariant.prices[0].discounted?.value.centAmount) {
      productInfo.discountedPrice = `${data.masterVariant.prices[0].discounted.value.centAmount / priceAmount} ${productCurrencyMap.EUR}`;
    }
    productInfo.currentPrice = productInfo.discountedPrice || productInfo.basePrice;
    productInfo.previousPrice = productInfo.discountedPrice ? productInfo.basePrice : '';
  }
  return productInfo;
}
