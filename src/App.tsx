import { router } from '@core/routing/router';
import useInitAuth from '@hooks/useInitAuth';
import { createTheme, ThemeProvider } from '@mui/material';
import FallbackPage from '@pages/Fallback/Fallback.page';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';

// TODO: Remove custom breakpoints after hiding Sign In and Sign Up buttons for logged in user

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxs: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0,
      xs: 500,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function App() {
  useInitAuth();

  return (
    <SnackbarProvider maxSnack={5}>
      <ThemeProvider theme={theme}>
        <SWRConfig value={{ dedupingInterval: 1000, revalidateOnFocus: false, revalidateOnReconnect: false }}>
          <RouterProvider router={router} fallbackElement={<FallbackPage />} />
        </SWRConfig>
      </ThemeProvider>
    </SnackbarProvider>
  );
}
