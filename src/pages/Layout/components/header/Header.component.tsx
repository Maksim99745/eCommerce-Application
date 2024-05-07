import { drawerWidth } from '@constants/ui.const';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ReactNode } from 'react';

interface HeaderProps {
  handleDrawerToggle: () => void;
}

function HeaderComponent({ handleDrawerToggle }: HeaderProps): ReactNode {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
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
        <Typography variant="h6" noWrap component="div">
          Header
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderComponent;
