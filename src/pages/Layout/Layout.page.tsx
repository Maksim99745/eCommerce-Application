import { CategoriesListComponent } from '@components/CategoriesList/CategoriesList.component';
import { drawerWidth } from '@constants/ui.const';
import { Box, Button, CssBaseline, Divider, Drawer, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import BreadcrumbsComponent from '@pages/Layout/components/Breadcrumbs/Breadcrumbs.component';
import FooterComponent from '@pages/Layout/components/Footer/Footer.component';
import { useCallback, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import HeaderComponent from '@pages/Layout/components/Header/Header.component';
import { SidebarComponent } from '@pages/Layout/components/Sidebar/Sidebar.component';
import InventoryIcon from '@mui/icons-material/Inventory';

function LayoutPage() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(isSmUp);
  const [isClosing, setIsClosing] = useState(false);

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

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <CssBaseline />
      <HeaderComponent handleDrawerToggle={handleDrawerToggle} isDrawerOpen={isDrawerOpen} />

      <Box component="aside" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="categories">
        <Drawer
          variant={isSmUp ? 'permanent' : 'temporary'}
          open={isDrawerOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, boxShadow: 3 } }}
        >
          <SidebarComponent>
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
                sx={{
                  fontSize: '16px',
                  textAlign: 'left',
                  width: '100%',
                  p: 1,
                  fontWeight: '600',
                  color: 'text.primary',
                }}
              >
                Catalog
              </Typography>
            </Button>
            <Divider />
            <CategoriesListComponent onSelectCategory={handleDrawerClose} />
          </SidebarComponent>
        </Drawer>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <BreadcrumbsComponent />
        <Box
          component="main"
          sx={{
            p: { xs: 1, sm: 2 },
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            overflow: 'auto',
            scrollbarGutter: 'stable',
          }}
        >
          <Outlet />
        </Box>
        <FooterComponent />
      </Box>
    </Box>
  );
}

export default LayoutPage;
