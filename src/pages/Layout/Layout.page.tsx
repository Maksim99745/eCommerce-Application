import { CategoriesListComponent } from '@components/CategoriesList/CategoriesList.component';
import { drawerWidth } from '@constants/ui.const';
import { Box, CssBaseline, Drawer, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import FooterComponent from '@pages/Layout/components/Footer/Footer.component';
import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from '@pages/Layout/components/Header/Header.component';
import { SidebarComponent } from '@pages/Layout/components/Sidebar/Sidebar.component';

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
          sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          <SidebarComponent>
            <CategoriesListComponent />
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
        <Box
          component="main"
          sx={{ p: { xs: 1, sm: 2 }, display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'auto' }}
        >
          <Outlet />
        </Box>
        <FooterComponent />
      </Box>
    </Box>
  );
}

export default LayoutPage;
