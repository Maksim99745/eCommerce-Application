import { Suspense } from 'react';
import { HasUserRoute, NoUserRoute } from '@core/routing/routes';
import { createBrowserRouter } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import {
  RegistrationPage,
  AboutPage,
  BucketPage,
  CartPage,
  CatalogPage,
  LayoutPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
} from './routing-object';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    errorElement: (
      <Suspense fallback={<CircularProgress sx={{ alignSelf: 'center', marginTop: '50%' }} />}>
        <NotFoundPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<CircularProgress sx={{ alignSelf: 'center', marginTop: '50%' }} />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <NoUserRoute>
            <Suspense fallback={<CircularProgress sx={{ alignSelf: 'center', marginTop: '50%' }} />}>
              <LoginPage />
            </Suspense>
          </NoUserRoute>
        ),
      },
      {
        path: 'registration',
        element: (
          <NoUserRoute>
            <Suspense fallback={<CircularProgress sx={{ alignSelf: 'center', marginTop: '50%' }} />}>
              <RegistrationPage />
            </Suspense>
          </NoUserRoute>
        ),
      },
      {
        path: 'bucket',
        element: (
          <Suspense fallback={<CircularProgress sx={{ alignSelf: 'center', marginTop: '50%' }} />}>
            <BucketPage />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <HasUserRoute>
            <Suspense fallback={<CircularProgress sx={{ alignSelf: 'center', marginTop: '50%' }} />}>
              <ProfilePage />
            </Suspense>
          </HasUserRoute>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<CircularProgress sx={{ alignSelf: 'center', marginTop: '50%' }} />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<CircularProgress sx={{ alignSelf: 'center', marginTop: '50%' }} />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: 'categories/:categoryKey',
        element: (
          <Suspense fallback={<CircularProgress sx={{ alignSelf: 'center', marginTop: '50%' }} />}>
            <CatalogPage />
          </Suspense>
        ),
      },
    ],
  },
]);
