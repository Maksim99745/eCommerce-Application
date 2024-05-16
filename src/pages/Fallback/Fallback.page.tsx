import { Box, CircularProgress } from '@mui/material';

function FallbackPage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <CircularProgress />
    </Box>
  );
}

export default FallbackPage;
