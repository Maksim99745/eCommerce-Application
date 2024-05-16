import { AuthProvider } from '@core/api/auth.provider';
import { router } from '@core/routing/router';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import FallbackPage from '@pages/Fallback/Fallback.page';
import { SWRConfig } from 'swr';
import './index.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SWRConfig value={{ dedupingInterval: 1000, revalidateOnFocus: false, revalidateOnReconnect: false }}>
      <AuthProvider>
        <RouterProvider router={router} fallbackElement={<FallbackPage />} />
      </AuthProvider>
    </SWRConfig>
  </StrictMode>,
);
