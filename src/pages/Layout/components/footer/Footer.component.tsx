import { Box } from '@mui/material';
import { ReactNode } from 'react';

function FooterComponent(): ReactNode {
  return (
    <Box component="footer" sx={{ p: 1, display: 'flex', justifyItems: 'center' }}>
      <p>Footer</p>
    </Box>
  );
}

export default FooterComponent;
