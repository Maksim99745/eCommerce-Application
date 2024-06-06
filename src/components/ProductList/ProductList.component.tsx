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
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const { category } = useCategory();
  const [filter, setFilter] = useState<ProductFilter>({
    offset: defaultProductsOffset,
    limit: defaultProductsLimit,
    query,
    categoryId: category?.id,
    ...defaultProductsFilter,
  });

  const updateProducts = useEventCallback((data: ProductProjectionPagedSearchResponse) => {
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
  });

  const { isLoading, isValidating } = useGetProducts(filter, { onSuccess: updateProducts });

  const setRef = useIntersectRef(() => {
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

  useEffect(() => {
    setProducts([]);
    setFilter({
      offset: defaultProductsOffset,
      limit: defaultProductsLimit,
      categoryId: category?.id,
      query,
      ...defaultProductsFilter,
    });
    setHasMore(false);
  }, [category, query]);

  const handleFilterChange = useEventCallback((newFilter: ProductFilter) => {
    const newFullFilter = { ...filter, ...getAttributesFilter(newFilter), offset: defaultProductsOffset };
    if (JSON.stringify(newFullFilter) === JSON.stringify(filter)) {
      return;
    }

    setProducts([]);
    setFilter(newFullFilter);
    setHasMore(false);
    document.getElementById('main')?.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return (
    <Stack gap={2}>
      <ProductListFilterComponent onChange={handleFilterChange} />

      <Paper elevation={2} sx={{ p: 2, width: '100%', flex: 1 }}>
        {!products.length && (isLoading || isValidating) && <ProductListSkeletonComponent />}
        {!products.length && !(isLoading || isValidating) && (
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
                <CircularProgress ref={setRef} />
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
