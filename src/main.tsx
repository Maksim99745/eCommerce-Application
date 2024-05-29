import { router } from '@core/routing/router';
import { createTheme, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import FallbackPage from '@pages/Fallback/Fallback.page';
import { SWRConfig } from 'swr';
import './index.scss';
import { SnackbarProvider } from 'notistack';

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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider maxSnack={5}>
      <ThemeProvider theme={theme}>
        <SWRConfig value={{ dedupingInterval: 1000, revalidateOnFocus: false, revalidateOnReconnect: false }}>
          <RouterProvider router={router} fallbackElement={<FallbackPage />} />
        </SWRConfig>
      </ThemeProvider>
    </SnackbarProvider>
  </StrictMode>,
);
