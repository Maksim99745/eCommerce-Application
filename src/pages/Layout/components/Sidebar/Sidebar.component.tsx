import MenuIcon from '@mui/icons-material/Menu';
import { Divider, IconButton, Toolbar } from '@mui/material';
import { ReactNode } from 'react';

interface SidebarProps {
  handleDrawerToggle: () => void;
  children: ReactNode;
}

export function SidebarComponent({ handleDrawerToggle, children }: SidebarProps) {
  return (
    <>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      {children}
    </>
  );
}
