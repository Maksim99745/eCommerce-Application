import { CategoriesListComponent } from '@components/CategoriesList/CategoriesList.component';
import { drawerWidth } from '@constants/ui.const';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import BreadcrumbsComponent from '@pages/Layout/components/Breadcrumbs/Breadcrumbs.component';
import FooterComponent from '@pages/Layout/components/Footer/Footer.component';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import HeaderComponent from '@pages/Layout/components/Header/Header.component';
import InventoryIcon from '@mui/icons-material/Inventory';

const CLOSE_DRAWER_LOCATIONS = ['/about'];

function LayoutPage() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(isSmUp);
  const [drawerVariant, setDrawerVariant] = useState<'permanent' | 'temporary'>(isSmUp ? 'permanent' : 'temporary');
  const [isClosing, setIsClosing] = useState(false);
  const mainRef = useRef<Element>();

  const handleDrawerClose = useCallback(() => {
    setIsClosing(true);
    setIsDrawerOpen(false);
  }, []);

  const handleDrawerTransitionEnd = useCallback(() => setIsClosing(false), []);

  const handleDrawerToggle = useCallback(() => {
    if (!isClosing) {
      setIsDrawerOpen(!isDrawerOpen);
    }
  }, [isClosing, isDrawerOpen]);

  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (pathname) {
      mainRef.current?.scrollTo?.({ top: 0, behavior: 'instant' });
    }

    if (CLOSE_DRAWER_LOCATIONS.includes(pathname)) {
      setDrawerVariant('temporary');
      setIsDrawerOpen(false);
    } else {
      setDrawerVariant('permanent');
    }
  }, [pathname]);

  return (
    <Stack direction="row" sx={{ height: '100%' }}>
      <CssBaseline />
      <HeaderComponent handleDrawerToggle={handleDrawerToggle} isDrawerOpen={isDrawerOpen} />

      <Box
        component="aside"
        sx={{
          minWidth: { xs: drawerVariant === 'permanent' && isSmUp ? drawerWidth : 0 },
          flexShrink: { xs: drawerVariant === 'permanent' && isSmUp ? 1 : 0 },
        }}
        aria-label="categories"
      >
        <Drawer
          variant={isSmUp ? drawerVariant : 'temporary'}
          open={isDrawerOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, boxShadow: 3 } }}
        >
          <Toolbar />
          <Button
            sx={{ borderRadius: 4, textTransform: 'none', display: { xs: 'flex', sm: 'flex', md: 'none' } }}
            component={Link}
            to="/catalog"
            size="medium"
            variant="text"
          >
            <InventoryIcon sx={{ color: 'text.primary', height: 20 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{ fontSize: '16px', width: '100%', p: 1, fontWeight: '600', color: 'text.primary' }}
            >
              Catalog
            </Typography>
          </Button>

          <Divider />

          <CategoriesListComponent onSelectCategory={handleDrawerClose} />
          <Toolbar />
        </Drawer>
      </Box>

      <Stack sx={{ flexGrow: 1, p: 0, width: '100%' }}>
        <Toolbar />

        <BreadcrumbsComponent />

        <Box
          ref={mainRef}
          component="main"
          id="main"
          sx={{
            p: { xs: 1, md: 2 },
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            overflow: 'auto',
            scrollbarGutter: 'stable',
          }}
        >
          <Outlet />
        </Box>

        <Toolbar />
      </Stack>

      <FooterComponent />
    </Stack>
  );
}

export default LayoutPage;
