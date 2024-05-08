import { drawerWidth } from '@constants/ui.const';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  handleDrawerToggle: () => void;
}

function HeaderComponent({ handleDrawerToggle }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Button component={Link} to="/" sx={{ color: '#fff', textTransform: 'none' }} variant="text">
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }} variant="h1" noWrap>
              Homeware Hub
            </Typography>
          </Button>
        </Box>

        <Box component="nav" sx={{ display: 'flex', gap: '10px' }}>
          <Button component={Link} to="/login" sx={{ color: '#fff', borderColor: '#fff' }} variant="outlined">
            Login
          </Button>
          <Button component={Link} to="/registration" sx={{ color: '#fff', borderColor: '#fff' }} variant="outlined">
            Registration
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const HeaderMemoizedComponent = memo(HeaderComponent);

export default HeaderMemoizedComponent;
