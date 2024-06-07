import { ProductProjection, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { ProductListFilterComponent } from '@components/ProductList/components/ProductListFilter.component';
import { defaultProductsFilter, defaultProductsLimit, defaultProductsOffset } from '@constants/products.const';
import useCategory from '@hooks/useCategory';
import { useGetProducts } from '@core/api/hooks/useGetProducts';
import useIntersectRef from '@hooks/useIntersectRef';
import { ProductFilter } from '@models/product-filter.model';
import { Box, CircularProgress, Grid, Paper, Stack, Typography, useEventCallback } from '@mui/material';
import ProductCardComponent from '@components/ProductList/components/ProductCard.component';
import { ProductListSkeletonComponent } from '@components/ProductList/ProductList.component.skeleton';
import { getAttributesFilter } from '@utils/get-attributes-filter';
import { memo, useEffect, useState } from 'react';

interface ProductListComponentProps {
  query?: string;
  productPath?: string;
}

function ProductListComponent({ query, productPath = '' }: ProductListComponentProps) {
  const [hasMore, setHasMore] = useState<boolean | null>(null);
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const { category } = useCategory();
  const [filter, setFilter] = useState<ProductFilter>({
    offset: defaultProductsOffset,
    limit: defaultProductsLimit,
    query,
    categoryId: category?.id,
    ...defaultProductsFilter,
  });

  const updateFilter = useEventCallback((newFilter: ProductFilter) => {
    if (JSON.stringify(newFilter) === JSON.stringify(filter)) {
      return;
    }

    setProducts([]);
    setHasMore(null);
    setFilter(newFilter);
  });

  useEffect(
    () => updateFilter({ ...filter, categoryId: category?.id, query }),
    [category, filter, query, updateFilter],
  );

  useGetProducts(filter, {
    onSuccess: (data: ProductProjectionPagedSearchResponse) => {
      if (!data?.results) {
        return;
      }

      const offset = filter.offset || defaultProductsOffset;
      const count = offset + data.count;
      const loadMore = !!data?.total && count < data.total;

      setHasMore(loadMore);

      if (offset === defaultProductsOffset) {
        setProducts(data.results);
        return;
      }

      setProducts((prevProducts) => {
        // Fix bug with duplicate products
        const productIds = new Set(prevProducts.map((product) => product.id));
        const newProducts = data.results.filter((product) => !productIds.has(product.id));

        return [...prevProducts, ...newProducts];
      });
    },
  });

  const loadMoreRef = useIntersectRef(() => {
    if (!hasMore) {
      return;
    }

    setFilter((prevFilter) => ({
      ...prevFilter,
      categoryId: category?.id,
      query,
      offset: (prevFilter.offset || defaultProductsOffset) + defaultProductsLimit,
    }));
  });

  const handleFilterChange = useEventCallback((newFilter: ProductFilter) => {
    updateFilter({ ...filter, ...getAttributesFilter(newFilter), offset: defaultProductsOffset });
    document.getElementById('main')?.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return (
    <Stack gap={2}>
      <ProductListFilterComponent onChange={handleFilterChange} />

      <Paper elevation={2} sx={{ p: 2, width: '100%', flex: 1 }}>
        {hasMore === null && <ProductListSkeletonComponent />}
        {!products.length && hasMore !== null && (
          <Typography variant="h4" sx={{ textAlign: 'center', m: 3 }}>
            No products found
          </Typography>
        )}

        {!!products.length && (
          <Grid container gap={4} columns={3} justifyContent="center">
            {products.map((product) => (
              <Grid item key={product.id} sx={{ width: '100%', maxWidth: 400 }}>
                <ProductCardComponent product={product} productPath={productPath} />
              </Grid>
            ))}

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', height: 50 }}>
              {hasMore ? (
                <CircularProgress ref={loadMoreRef} />
              ) : (
                <Typography variant="h6">Yay! You have seen it all</Typography>
              )}
            </Box>
          </Grid>
        )}
      </Paper>
    </Stack>
  );
}

const ProductListMemoizedComponent = memo(ProductListComponent);

export default ProductListMemoizedComponent;
