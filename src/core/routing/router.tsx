import { HasUserRoute, NoUserRoute } from '@core/routing/routes';
import AboutPage from '@pages/About/About.page';
import BucketPage from '@pages/Bucket/Bucket.page';
import CatalogPage from '@pages/Catalog/Catalog.page';
import LayoutPage from '@pages/Layout/Layout.page';
import LoginPage from '@pages/Login/Login.page';
import MainPage from '@pages/Main/Main.page';
import NotFoundPage from '@pages/NotFound/NotFound.page';
import ProfilePage from '@pages/Profile/Profile.page';
import RegistrationPage from '@pages/Registration/Registration.page';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
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
        element: (
          <NoUserRoute>
            <LoginPage />
          </NoUserRoute>
        ),
      },
      {
        path: 'registration',
        element: (
          <NoUserRoute>
            <RegistrationPage />
          </NoUserRoute>
        ),
      },
      {
        path: 'bucket',
        element: <BucketPage />,
      },
      {
        path: 'profile',
        element: (
          <HasUserRoute>
            <ProfilePage />
          </HasUserRoute>
        ),
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
