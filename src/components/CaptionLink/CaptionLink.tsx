import { ReactNode } from 'react';
import { userLoadingSignal } from '@core/signals/user.signal';
import { Box, Button, Typography } from '@mui/material';
import { Link, To } from 'react-router-dom';

type FormLinkProps = {
  caption: ReactNode;
  linkCaption: string;
  to: To;
};

export function CaptionLink({ caption, linkCaption, to }: FormLinkProps): ReactNode {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        mt: 3,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography component="span" align="center" sx={{ mr: 1 }}>
        {caption}
      </Typography>
      <Button component={Link} to={to} disabled={userLoadingSignal.value} sx={{ textTransform: 'none' }}>
        {linkCaption}
      </Button>
    </Box>
  );
}
