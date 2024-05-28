import { ProductProjection } from '@commercetools/platform-sdk';
import { priceAmount } from '@constants/products.const';
import { ProductCard } from '@models/product.model';

export function mapProductToProductCard(product: ProductProjection): ProductCard {
  return {
    name: product.name.en,
    image: product.masterVariant.images?.[0].url || '',
    price: (product.masterVariant.prices?.[0].value.centAmount || 0) / priceAmount,
    discounted: (product.masterVariant.prices?.[0].discounted?.value.centAmount || 0) / priceAmount,
    currency: product.masterVariant.prices?.[0].value.currencyCode || 'EUR',
    description: product.description?.en || '',
  };
}
