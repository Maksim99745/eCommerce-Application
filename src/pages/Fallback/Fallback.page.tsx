import { CategoriesListSkeletonComponent } from '@components/CategoriesList/CategoriesListSkeleton.component';
import { drawerWidth } from '@constants/ui.const';
import { AppBar, Box, CircularProgress, CssBaseline, Drawer, Skeleton, Stack, Toolbar } from '@mui/material';

function FallbackPage() {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton variant="circular" width={40} height={40} sx={{ display: { xs: 'block', sm: 'none' } }} />
            <Skeleton variant="rectangular" width={180} height={30} />
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton variant="rectangular" width={100} height={30} sx={{ display: { xs: 'none', sm: 'block' } }} />
            <Skeleton variant="circular" width={60} height={40} sx={{ borderRadius: 4 }} />
            <Skeleton variant="circular" width={40} height={40} />
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        component="aside"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, display: { xs: 'none', sm: 'flex' } }}
        aria-label="aside"
      >
        <Drawer variant="permanent" sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
          <Toolbar />
          <CategoriesListSkeletonComponent />
        </Drawer>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        <CircularProgress size={50} thickness={5} />
      </Box>
    </Box>
  );
}

export default FallbackPage;
