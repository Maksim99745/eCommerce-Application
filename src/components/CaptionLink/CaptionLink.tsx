import useAuth from '@hooks/useAuth';
import { ReactNode } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link, To } from 'react-router-dom';

type CaptionLinkProps = {
  caption: ReactNode;
  linkCaption: string;
  to: To;
};

export function CaptionLink({ caption, linkCaption, to }: CaptionLinkProps): ReactNode {
  const { isUserLoading } = useAuth();

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
      <Button component={Link} to={to} disabled={isUserLoading} sx={{ textTransform: 'none' }}>
        {linkCaption}
      </Button>
    </Box>
  );
}
