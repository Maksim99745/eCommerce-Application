import { Skeleton, Stack } from '@mui/material';

export function PagePreloader() {
  return (
    <Stack spacing={{ xs: 2.5 }}>
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
    </Stack>
  );
}
// return <CircularProgress sx={{ alignSelf: 'center', marginTop: '50%' }} />;
