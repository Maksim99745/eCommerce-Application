import { Container, Paper, Skeleton, Stack } from '@mui/material';
import { ProductListSkeletonComponent } from '@components/ProductList/ProductList.component.skeleton';

export function CatalogPageSkeleton() {
  return (
    <Container maxWidth="xl" sx={{ p: 0 }}>
      <Paper elevation={1} sx={{ p: 0, width: '100%' }}>
        <Stack gap={2}>
          <Skeleton variant="rounded" role="progressbar" width="100%" height={200} />

          <ProductListSkeletonComponent />
        </Stack>
      </Paper>
    </Container>
  );
}
