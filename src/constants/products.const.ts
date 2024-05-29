import { ProductFilter } from '@models/product-filter.model';

export const defaultProductsLimit = 12;
export const defaultProductsOffset = 0;
export const priceAmount = 100;
export const minCount = 1;
export const maxCount = 99;
export const minPrice = 0.01;
export const maxPrice = 100;
export const stepPrice = 1;

export const productCurrencyMap: Record<string, string> = {
  USD: '$',
  EUR: '€',
};

export const defaultProductsFilter: ProductFilter = {
  price: { min: minPrice, max: maxPrice },
  brands: [],
  materials: [],
  colors: [],
  countries: [],
};
