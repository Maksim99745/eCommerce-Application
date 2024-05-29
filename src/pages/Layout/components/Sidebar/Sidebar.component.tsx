import { Toolbar } from '@mui/material';
import { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
}

export function SidebarComponent({ children }: SidebarProps) {
  return (
    <>
      <Toolbar />
      {children}
    </>
  );
}
