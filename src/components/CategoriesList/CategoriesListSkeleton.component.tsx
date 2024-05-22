import { Skeleton, Stack } from '@mui/material';

export function CategoriesListSkeletonComponent() {
  return (
    <Stack spacing={1} sx={{ p: 2 }} role="progressbar">
      <Skeleton variant="text" width="100%" height={40} />
      <Skeleton variant="text" width="100%" height={40} />
      <Skeleton variant="text" width="100%" height={40} />
      <Skeleton variant="text" width="100%" height={40} />
      <Skeleton variant="text" width="100%" height={40} />
    </Stack>
  );
}
