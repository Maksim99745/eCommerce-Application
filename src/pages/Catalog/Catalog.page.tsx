import { useGetCategory } from '@hooks/useGetCategory';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { CatalogPageSkeleton } from '@pages/Catalog/Catalog.page.skeleton';
import ProductListComponent from '@components/ProductList/ProductList.component';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

function CatalogPage() {
  const { categoryKey = 'popular' } = useParams<'categoryKey'>();
  const { data: category, isLoading } = useGetCategory(categoryKey);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'instant' });
  }, []);

  if (isLoading) {
    return <CatalogPageSkeleton />;
  }

  if (!category) {
    return <Typography variant="h5">Category not found</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ p: 0, height: '100%' }}>
      <Stack gap={2} sx={{ height: '100%' }}>
        {category.description?.en && (
          <Box
            sx={{
              width: '100%',
              height: '200px',
              position: 'relative',
              backgroundImage: `url("${category.description.en}")`,
              backgroundSize: 'cover',
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                position: 'absolute',
                top: 10,
                left: 20,
                color: 'primary.light',
                fontWeight: 'bold',
                textShadow:
                  '3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8)',
              }}
            >
              {category.name.en}
            </Typography>
          </Box>
        )}
        {!category.description?.en && <Typography variant="h4">{category.name.en} products</Typography>}

        <Paper elevation={1} sx={{ p: 2, width: '100%', height: '100%', overflow: 'auto' }} ref={containerRef}>
          <ProductListComponent categoryId={category.id} />
        </Paper>
      </Stack>
    </Container>
  );
}

export default CatalogPage;
