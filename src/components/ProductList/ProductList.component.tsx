import { ProductProjection, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { defaultProductsLimit, defaultProductsOffset } from '@constants/products.const';
import { useGetProducts } from '@hooks/useGetProducts';
import useIntersectRef from '@hooks/useIntersectRef';
import { ProductFilter } from '@models/product-filter.model';
import { Box, CircularProgress, Grid, Typography, useEventCallback } from '@mui/material';
import ProductCardComponent from '@components/ProductCard/ProductCard.component';
import { ProductListSkeletonComponent } from '@components/ProductList/ProductList.component.skeleton';
import { memo, useEffect, useRef, useState } from 'react';

interface ProductListComponentProps {
  categoryId: string;
}

function ProductListComponent({ categoryId }: ProductListComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const { error, isLoading, isValidating } = useGetProducts(filter, { onSuccess: updateProducts });

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
    containerRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [categoryId]);

  if (error) {
    return <Typography variant="h6">Error loading products</Typography>;
  }

  if (!products.length && (isLoading || isValidating)) {
    return <ProductListSkeletonComponent />;
  }

  if (!products.length && !(isLoading || isValidating)) {
    return <Typography variant="h6">No products found</Typography>;
  }

  return (
    <Grid container gap={4} columns={3} justifyContent="center" sx={{ p: 2 }} ref={containerRef}>
      {products.map((product) => (
        <Grid item key={product.id} sx={{ width: '100%', maxWidth: 400 }}>
          <ProductCardComponent product={product} />
        </Grid>
      ))}

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', height: 50 }}>
        {hasMore ? <CircularProgress ref={setRef} /> : <Typography variant="h6">Yay! You have seen it all</Typography>}
      </Box>
    </Grid>
  );
}

const ProductListMemoizedComponent = memo(ProductListComponent);

export default ProductListMemoizedComponent;
