import { Slide, useScrollTrigger } from '@mui/material';
import { ReactElement } from 'react';

interface HideOnScrollComponentProps {
  target?: Window | Node | undefined;
  children: ReactElement;
}

export function HideOnScrollComponent({ target, children }: HideOnScrollComponentProps) {
  const trigger = useScrollTrigger({ target });

  return (
    <Slide appear={false} direction="down" in={!trigger} unmountOnExit>
      {children}
    </Slide>
  );
}
