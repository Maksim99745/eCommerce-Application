import { drawerWidth } from '@constants/ui.const';
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

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

        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button key="main" sx={{ color: '#fff' }}>
            <Link to="/">Main</Link>
          </Button>
          <Button key="login" sx={{ color: '#fff' }}>
            <Link to="/login">Login</Link>
          </Button>
          <Button key="registration" sx={{ color: '#fff' }}>
            <Link to="/registration">Registration</Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderComponent;
