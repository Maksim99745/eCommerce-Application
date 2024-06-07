import { router } from '@core/routing/router';
import FallbackPage from '@pages/Fallback/Fallback.page';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';

export default function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <SWRConfig value={{ dedupingInterval: 3000, revalidateOnFocus: false, revalidateOnReconnect: false }}>
        <RouterProvider router={router} fallbackElement={<FallbackPage />} />
      </SWRConfig>
    </SnackbarProvider>
  );
}
