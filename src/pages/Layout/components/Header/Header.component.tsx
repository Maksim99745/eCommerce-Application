import { AppBar, Avatar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import HeaderActionsComponent from '../HeaderActions/HeaderActions.component';

interface HeaderProps {
  handleDrawerToggle: () => void;
}

function HeaderComponent({ handleDrawerToggle }: HeaderProps) {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, height: 40, width: 40, p: 0 }}
          >
            <MenuIcon />
          </IconButton>

          <Button
            component={Link}
            to="/"
            sx={{ display: 'flex', gap: '10px', color: '#fff', textTransform: 'none', p: 0 }}
            variant="text"
          >
            <Avatar alt="Logo" src="/logo.webp" sx={{ width: 40, height: 40, borderRadius: 0 }} />
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }} variant="h1" noWrap>
              Homeware Hub
            </Typography>
          </Button>
        </Stack>

        <HeaderActionsComponent />
      </Toolbar>
    </AppBar>
  );
}

const HeaderMemoizedComponent = memo(HeaderComponent);

export default HeaderMemoizedComponent;
