import { ProductData } from '@commercetools/platform-sdk';
import { priceAmount, productCurrencyMap } from '@constants/products.const';

export function generateProductObj(data: ProductData | undefined): Record<string, string> {
  const productInfo: Record<string, string> = {};

  productInfo.productName = data?.name.en || '';
  if (data?.masterVariant?.attributes) {
    data.masterVariant.attributes.forEach((attribute) => {
      productInfo[attribute.name] = String(attribute.value);
    });
  }

  if (data?.masterVariant.prices) {
    if (data.masterVariant.prices[0].value.centAmount) {
      productInfo.basePrice = `${data.masterVariant.prices[0].value.centAmount / priceAmount} ${productCurrencyMap.EUR}`;
    }
    if (data.masterVariant.prices[0].discounted?.value.centAmount) {
      productInfo.discountedPrice = `${data.masterVariant.prices[0].discounted.value.centAmount / priceAmount} ${productCurrencyMap.EUR}`;
    }
  }
  return productInfo;
}
