import { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { drawerWidth } from '@constants/ui.const';
import { getCategories } from '@core/api/requests';
import { Box, CssBaseline, Drawer, Toolbar } from '@mui/material';
import FooterComponent from '@pages/Layout/components/footer/Footer.component';
import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useSWR, { SWRResponse } from 'swr';
import HeaderComponent from './components/header/Header.component';
import SidebarComponent from './components/sidebar/Sidebar.component';

function LayoutPage(): ReactNode {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const categoriesResponse: SWRResponse<CategoryPagedQueryResponse> = useSWR('/api/user/123', getCategories);

  const handleDrawerClose = (): void => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = (): void => {
    setIsClosing(false);
  };

  const handleDrawerToggle = (): void => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <CssBaseline />
      <HeaderComponent handleDrawerToggle={handleDrawerToggle} />
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <SidebarComponent categoriesResponse={categoriesResponse} handleDrawerToggle={handleDrawerToggle} />
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <SidebarComponent categoriesResponse={categoriesResponse} handleDrawerToggle={handleDrawerToggle} />
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
        <Box component="main" sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Outlet />
        </Box>
        <FooterComponent />
      </Box>
    </Box>
  );
}

export default LayoutPage;
