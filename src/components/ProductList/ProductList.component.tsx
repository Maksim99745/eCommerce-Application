import { ProductProjection } from '@commercetools/platform-sdk';
import { defaultProductsLimit, defaultProductsOffset } from '@constants/products.const';
import { useGetProducts } from '@hooks/useGetProducts';
import { ProductFilter } from '@models/product-filter.model';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import ProductCardComponent from '@components/ProductCard/ProductCard.component';
import { ProductListSkeletonComponent } from '@components/ProductList/ProductList.component.skeleton';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

interface ProductListComponentProps {
  categoryId: string;
}

function ProductListComponent({ categoryId }: ProductListComponentProps) {
  const [isInitLoading, setIsInitLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [filter, setFilter] = useState<ProductFilter>({ categoryId, offset: defaultProductsOffset });
  const { data: loadedProducts, isLoading, error } = useGetProducts(filter);
  const loaderRef = useRef(null);

  const resetProductsAndFilter = useCallback(() => {
    setProducts([]);
    setFilter({ categoryId, offset: defaultProductsOffset });
    setHasMore(false);
  }, [categoryId]);

  const updateProducts = useCallback(() => {
    if (!loadedProducts?.results) {
      return;
    }

    const offset = filter.offset || defaultProductsOffset;
    const count = offset + loadedProducts.count;
    const loadMore = !!loadedProducts?.total && count < loadedProducts.total;

    setHasMore(loadMore);

    if (offset === defaultProductsOffset) {
      setIsInitLoading(false);
      setProducts(loadedProducts.results);
      return;
    }

    setProducts((prevProducts) => {
      // Fix bug with duplicate products
      const productIds = new Set(prevProducts.map((product) => product.id));
      const newProducts = loadedProducts.results.filter((product) => !productIds.has(product.id));
      return [...prevProducts, ...newProducts];
    });
  }, [loadedProducts, filter]);

  const loadMoreProducts = useCallback(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      categoryId,
      offset: (prevFilter.offset || defaultProductsOffset) + defaultProductsLimit,
    }));
  }, [categoryId]);

  const observeLoader = useCallback(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreProducts();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loadMoreProducts]);

  useEffect(() => resetProductsAndFilter(), [resetProductsAndFilter]);
  useEffect(() => updateProducts(), [updateProducts]);
  useEffect(() => observeLoader(), [observeLoader]);
  useEffect(() => setIsInitLoading(true), [categoryId]);

  if (error) {
    return <Typography variant="h6">Error loading products</Typography>;
  }

  if (isInitLoading) {
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
          <CircularProgress ref={loaderRef} />
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
