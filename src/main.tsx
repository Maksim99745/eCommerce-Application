import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import LayoutPage from '@pages/Layout/Layout.page';
import NotFoundPage from '@pages/NotFound/NotFound.page';
import MainPage from '@pages/Main/Main.page';
import FallbackPage from '@pages/Fallback/Fallback.page';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<FallbackPage />} />
  </StrictMode>,
);
