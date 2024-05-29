import { priceAmount } from '@constants/products.const';
import { GetProductsRequest, ProductFilter } from '@models/product-filter.model';

export const mapProductFilterToRequest = (productFilter: ProductFilter) => {
  const { limit, offset, categoryId, price, countries, colors, brands, materials } = productFilter;
  const request: GetProductsRequest = { limit, offset, filter: [] };

  if (categoryId) {
    request.filter?.push(`categories.id:subtree("${categoryId}")`);
  }

  if (price && price.min && price.max) {
    const min = price.min * priceAmount;
    const max = price.max * priceAmount;

    request.filter?.push(`variants.price.centAmount:range ("${min}" to "${max}")`);
  }

  if (countries?.length) {
    request.filter?.push(`variants.attributes.country:"${countries.join('","')}"`);
  }

  if (colors?.length) {
    request.filter?.push(`variants.attributes.color:"${colors.join('","')}"`);
  }

  if (brands?.length) {
    request.filter?.push(`variants.attributes.brand:"${brands.join('","')}"`);
  }

  if (materials?.length) {
    request.filter?.push(`variants.attributes.material:"${materials.join('","')}"`);
  }

  return request;
};
