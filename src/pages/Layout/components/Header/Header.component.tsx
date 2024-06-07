import { AppBar, Avatar, Button, IconButton, keyframes, Stack, styled, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { SearchComponent } from '@pages/Layout/components/Search/Search.component';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import HeaderActionsComponent from '../HeaderActions/HeaderActions.component';

interface HeaderProps {
  handleDrawerToggle: () => void;
  isDrawerOpen: boolean;
}

const fadeIn = keyframes`
  from {
    transform: rotate(180deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
`;

const AnimatedIcon = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${fadeIn} 0.3s ease-in-out`,
}));

function HeaderComponent({ handleDrawerToggle, isDrawerOpen }: HeaderProps) {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
        <Stack direction="row" gap={1}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, height: 40, width: 40, p: 0 }}
          >
            <AnimatedIcon key={String(isDrawerOpen)}>{isDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}</AnimatedIcon>
          </IconButton>

          <Button
            component={Link}
            to="/"
            sx={{ display: 'flex', gap: '10px', color: 'inherit', textTransform: 'none', p: 0, minWidth: 40 }}
            variant="text"
          >
            <Avatar alt="Logo" src="/logo.webp" sx={{ width: 30, height: 30, borderRadius: 0 }} />
            <Typography
              sx={{ fontSize: '1.2rem', fontWeight: 600, display: { xs: 'none', sm: 'flex' } }}
              variant="h1"
              noWrap
            >
              Homeware Hub
            </Typography>
          </Button>
        </Stack>
        <SearchComponent />
        <HeaderActionsComponent />
      </Toolbar>
    </AppBar>
  );
}

const HeaderMemoizedComponent = memo(HeaderComponent);

export default HeaderMemoizedComponent;
