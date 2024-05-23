import { Container, Paper, Skeleton, Stack } from '@mui/material';
import { ProductListSkeletonComponent } from '@components/ProductList/ProductList.component.skeleton';

export function CatalogPageSkeleton() {
  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
      <Paper elevation={1} sx={{ p: 2, width: '100%' }}>
        <Stack gap={2}>
          <Skeleton variant="rounded" width={300} height={32} />

          <ProductListSkeletonComponent />
        </Stack>
      </Paper>
    </Container>
  );
}
