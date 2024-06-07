import { ProductFilter } from '@models/product-filter.model';

export const getAttributesFilter = (filter: ProductFilter): ProductFilter => ({
  sort: filter.sort,
  price: filter.price,
  brands: filter.brands,
  materials: filter.materials,
  colors: filter.colors,
  countries: filter.countries,
});
