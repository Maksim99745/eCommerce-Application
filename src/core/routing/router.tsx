import { Suspense, lazy } from 'react';
import { HasUserRoute, NoUserRoute } from '@core/routing/routes';
import { createBrowserRouter } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const RegistrationPage = lazy(() => import('@pages/Registration/Registration.page'));
const AboutPage = lazy(() => import('@pages/About/About.page'));
const BucketPage = lazy(() => import('@pages/Bucket/Bucket.page'));
const CartPage = lazy(() => import('@pages/Cart/Cart.page'));
const CatalogPage = lazy(() => import('@pages/Catalog/Catalog.page'));
const LayoutPage = lazy(() => import('@pages/Layout/Layout.page'));
const LoginPage = lazy(() => import('@pages/Login/Login.page'));
const MainPage = lazy(() => import('@pages/Main/Main.page'));
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFound.page'));
const ProfilePage = lazy(() => import('@pages/Profile/Profile.page'));

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
