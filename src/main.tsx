import AboutPage from '@pages/About/About.page';
import CatalogPage from '@pages/Catalog/Catalog.page';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import BucketPage from '@pages/Bucket/Bucket.page';
import LoginPage from '@pages/Login/Login.page';
import ProfilePage from '@pages/Profile/Profile.page';
import RegistrationPage from '@pages/Registration/Registration.page';
import LayoutPage from '@pages/Layout/Layout.page';
import NotFoundPage from '@pages/NotFound/NotFound.page';
import MainPage from '@pages/Main/Main.page';
import FallbackPage from '@pages/Fallback/Fallback.page';
import './index.scss';
import { SWRConfig } from 'swr';

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
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'registration',
        element: <RegistrationPage />,
      },
      {
        path: 'bucket',
        element: <BucketPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'categories/:categoryKey',
        element: <CatalogPage />,
      },
    ],
  },
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SWRConfig value={{ dedupingInterval: 1000 }}>
      <RouterProvider router={router} fallbackElement={<FallbackPage />} />
    </SWRConfig>
  </StrictMode>,
);
