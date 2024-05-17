import { Suspense } from 'react';
import { HasUserRoute, NoUserRoute } from '@core/routing/routes';
import { createBrowserRouter } from 'react-router-dom';
import LayoutPage from '@pages/Layout/Layout.page';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import {
  RegistrationPage,
  AboutPage,
  BucketPage,
  CartPage,
  CatalogPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
} from './routing-pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PagePreloader />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<PagePreloader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'registration',
        element: (
          <NoUserRoute>
            <Suspense fallback={<PagePreloader />}>
              <RegistrationPage />
            </Suspense>
          </NoUserRoute>
        ),
      },
      {
        path: 'bucket',
        element: (
          <Suspense fallback={<PagePreloader />}>
            <BucketPage />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <HasUserRoute>
            <Suspense fallback={<PagePreloader />}>
              <ProfilePage />
            </Suspense>
          </HasUserRoute>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PagePreloader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<PagePreloader />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: 'categories/:categoryKey',
        element: (
          <Suspense fallback={<PagePreloader />}>
            <CatalogPage />
          </Suspense>
        ),
      },
    ],
  },
]);
