import { CategoriesListComponent } from '@components/CategoriesList/CategoriesList.component';
import { drawerWidth } from '@constants/ui.const';
import { Box, CssBaseline, Drawer, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import FooterComponent from '@pages/Layout/components/Footer/Footer.component';
import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from '@pages/Layout/components/Header/Header.component';
import { SidebarComponent } from '@pages/Layout/components/Sidebar/Sidebar.component';

const layoutStyles = {
  layoutContainer: { display: 'flex', height: '100%' },
  aside: { width: { sm: drawerWidth }, flexShrink: { sm: 0 } },
  drawer: { '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    p: 0,
    width: { sm: `calc(100% - ${drawerWidth}px)` },
  },
  main: { p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 },
};

function LayoutPage() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [isMobileOpen, setIsMobileOpen] = useState(isSmUp);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = useCallback(() => {
    setIsClosing(true);
    setIsMobileOpen(false);
  }, []);

  const handleDrawerTransitionEnd = useCallback(() => {
    setIsClosing(false);
  }, []);

  const handleDrawerToggle = useCallback(() => {
    if (!isClosing) {
      setIsMobileOpen(!isMobileOpen);
    }
  }, [isClosing, isMobileOpen]);

  return (
    <Box sx={layoutStyles.layoutContainer}>
      <CssBaseline />
      <HeaderComponent handleDrawerToggle={handleDrawerToggle} />
      <Box component="aside" sx={layoutStyles.aside} aria-label="categories">
        <Drawer
          variant={isSmUp ? 'permanent' : 'temporary'}
          open={isMobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={layoutStyles.drawer}
        >
          <SidebarComponent handleDrawerToggle={handleDrawerToggle}>
            <CategoriesListComponent />
          </SidebarComponent>
        </Drawer>
      </Box>

      <Box sx={layoutStyles.mainContainer}>
        <Toolbar />
        <Box component="main" sx={layoutStyles.main}>
          <Outlet />
        </Box>
        <FooterComponent />
      </Box>
    </Box>
  );
}

export default LayoutPage;
