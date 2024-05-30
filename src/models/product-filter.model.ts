export interface Range {
  min?: number | undefined;
  max?: number | undefined;
}

export interface ProductFilter {
  offset?: number;
  limit?: number;
  categoryId?: string;
  price?: Range;
  query?: string;
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
  brands?: Array<string | undefined>;
  materials?: Array<string | undefined>;
  colors?: Array<string | undefined>;
  countries?: Array<string | undefined>;
}

export interface GetProductsRequest {
  query?: string;
  offset?: number;
  limit?: number;
  filter?: string[];
}
