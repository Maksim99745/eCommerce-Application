import { Skeleton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

const SKELETON_DISPLAY_DELAY = 200;

export function PagePreloader() {
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEmpty(false);
    }, SKELETON_DISPLAY_DELAY);
  }, []);

  if (empty) {
    return null;
  }
  return (
    <Stack spacing={{ xs: 2.5 }}>
      <Skeleton variant="rectangular" width="100%" height={60} />
      <Skeleton variant="rectangular" width="100%" height={60} />
      <Skeleton variant="rectangular" width="100%" height={60} />
      <Skeleton variant="rectangular" width="100%" height={60} />
      <Skeleton variant="rectangular" width="100%" height={60} />
      <Skeleton variant="rectangular" width="100%" height={60} />
      <Skeleton variant="rectangular" width="100%" height={60} />
    </Stack>
  );
}
