import { Slide } from '@mui/material';
import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

interface HideOnPathsComponentProps {
  children: ReactElement;
  paths?: string[];
}

export function HideOnPathsComponent({ children, paths = ['/'] }: HideOnPathsComponentProps) {
  const location = useLocation();

  return (
    <Slide direction="down" in={!paths?.includes(location.pathname)} unmountOnExit>
      {children}
    </Slide>
  );
}
