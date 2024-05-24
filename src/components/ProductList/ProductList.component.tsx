import { ProductProjection, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { defaultProductsLimit, defaultProductsOffset } from '@constants/products.const';
import { useGetProducts } from '@hooks/useGetProducts';
import useIntersectRef from '@hooks/useIntersectRef';
import { ProductFilter } from '@models/product-filter.model';
import { Box, CircularProgress, Grid, Typography, useEventCallback } from '@mui/material';
import ProductCardComponent from '@components/ProductCard/ProductCard.component';
import { ProductListSkeletonComponent } from '@components/ProductList/ProductList.component.skeleton';
import { memo, useEffect, useState } from 'react';

interface ProductListComponentProps {
  categoryId: string;
}

function ProductListComponent({ categoryId }: ProductListComponentProps) {
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [filter, setFilter] = useState<ProductFilter>({ categoryId, offset: defaultProductsOffset });

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

  const { isLoading, error } = useGetProducts(filter, { onSuccess: updateProducts });

  const setRef = useIntersectRef(() => {
    if (!hasMore) {
      return;
    }

    setFilter((prevFilter) => ({
      ...prevFilter,
      categoryId,
      offset: (prevFilter.offset || defaultProductsOffset) + defaultProductsLimit,
    }));
  });

  useEffect(() => {
    setProducts([]);
    setFilter({ categoryId, offset: defaultProductsOffset });
    setHasMore(false);
  }, [categoryId]);

  if (error) {
    return <Typography variant="h6">Error loading products</Typography>;
  }

  if (!products.length && isLoading) {
    return <ProductListSkeletonComponent />;
  }

  if (!products.length && !isLoading) {
    return <Typography variant="h6">No products found</Typography>;
  }

  return (
    <Grid container gap={4} columns={3} justifyContent="center" sx={{ p: 0 }}>
      {products.map((product) => (
        <Grid item key={product.id} sx={{ width: '100%', maxWidth: 350 }}>
          <ProductCardComponent product={product} />
        </Grid>
      ))}

      {hasMore && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', height: 50 }}>
          <CircularProgress ref={setRef} />
        </Box>
      )}

      {!hasMore && (
        <Typography variant="h6" sx={{ width: '100%', textAlign: 'center' }}>
          Yay! You have seen it all
        </Typography>
      )}
    </Grid>
  );
}

const ProductListMemoizedComponent = memo(ProductListComponent);

export default ProductListMemoizedComponent;
