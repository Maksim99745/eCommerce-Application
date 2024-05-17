import { router } from '@core/routing/router';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import FallbackPage from '@pages/Fallback/Fallback.page';
import { SWRConfig } from 'swr';
import './index.scss';
import { SnackbarProvider } from 'notistack';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider maxSnack={5}>
      <SWRConfig value={{ dedupingInterval: 1000, revalidateOnFocus: false, revalidateOnReconnect: false }}>
        <RouterProvider router={router} fallbackElement={<FallbackPage />} />
      </SWRConfig>
    </SnackbarProvider>
  </StrictMode>,
);
