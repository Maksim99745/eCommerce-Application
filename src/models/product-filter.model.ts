export interface ProductFilter {
  offset?: number;
  limit?: number;
  categoryId?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  color?: string;
  size?: string;
  brand?: string;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
}
