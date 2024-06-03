import { OrderBy, Ordering } from '@enums/ordering.enum';
import { ReactNode } from 'react';

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
  sort?: SortOptionValue;
  brands?: Array<string | undefined>;
  materials?: Array<string | undefined>;
  colors?: Array<string | undefined>;
  countries?: Array<string | undefined>;
}

export interface GetProductsRequest {
  query?: string;
  offset?: number;
  limit?: number;
  sort?: string;
  filter?: string[];
}

export interface SortOptionValue {
  orderBy?: OrderBy;
  ordering?: Ordering;
}

export interface SortOption {
  label: string;
  key: string;
  icon: ReactNode;
  value: SortOptionValue;
}
