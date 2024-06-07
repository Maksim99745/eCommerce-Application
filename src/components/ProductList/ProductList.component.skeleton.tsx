import { Grid, Skeleton } from '@mui/material';

export function ProductListSkeletonComponent() {
  const cards = Array.from({ length: 6 }).map((_, index) => index);

  return (
    <Grid container gap={4} columns={2} justifyContent="center" sx={{ p: 2 }}>
      {cards.map((key) => (
        <Grid item key={key} sx={{ width: '100%', maxWidth: 400, height: 550, boxShadow: 3 }}>
          <Skeleton variant="rounded" sx={{ width: '100%', height: '100%' }} />
        </Grid>
      ))}
    </Grid>
  );
}
