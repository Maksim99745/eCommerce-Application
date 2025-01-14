import { apiService } from '@core/api/api.service';
import { ClientType } from '@core/api/client-type.enum';
import { tokenCache } from '@core/api/token-cache.service';
import { setUserLoading, setUser, userSignal } from '@core/api/hooks/useAuth';
import { setCategoryLoading } from '@hooks/useCategory';
import { Suspense } from 'react';
import { HasUserRoute, NoUserRoute } from '@core/routing/routes';
import { createBrowserRouter } from 'react-router-dom';
import LayoutPage from '@pages/Layout/Layout.page';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import {
  RegistrationPage,
  AboutPage,
  CartPage,
  CatalogPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  ProductPage,
  SearchPage,
} from './routing-pages';

const initAuth = async (): Promise<void> => {
  setUserLoading(true);

  await apiService
    .getCustomer()
    .then((user) => setUser(user))
    .catch(async (error): Promise<void> => {
      if (error?.body?.error !== 'invalid_token') {
        setUser(null);
        return;
      }

      if (apiService.clientType !== ClientType.refreshToken && tokenCache.get()?.refreshToken) {
        apiService.setBuilder(ClientType.refreshToken);
        await initAuth();
        return;
      }

      apiService.setBuilder(ClientType.anonymous);
      setUser(null);
    });
};

const initApp = async (): Promise<void> => {
  if (userSignal.value === undefined) {
    await initAuth();
  }
};

const initCategory = (): boolean => {
  setCategoryLoading(true);
  return true;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    async loader() {
      await initApp();

      return null;
    },
    children: [
      {
        index: true,
        loader: initCategory,
        element: (
          <Suspense fallback={<PagePreloader />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <NoUserRoute>
            <Suspense fallback={<PagePreloader />}>
              <LoginPage />
            </Suspense>
          </NoUserRoute>
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
        path: 'categories',
        children: [
          {
            path: ':categoryKey',
            loader: initCategory,
            element: (
              <Suspense fallback={<PagePreloader />}>
                <CatalogPage />
              </Suspense>
            ),
          },
          {
            path: ':categoryKey/products/:productKey',
            element: (
              <Suspense fallback={<PagePreloader />}>
                <ProductPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'products/:productKey',
        element: (
          <Suspense fallback={<PagePreloader />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: 'search',
        element: (
          <Suspense fallback={<PagePreloader />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: 'catalog',
        children: [
          {
            path: '',
            index: true,
            element: (
              <Suspense fallback={<PagePreloader />}>
                <CatalogPage />
              </Suspense>
            ),
          },
          {
            path: 'products/:productKey',
            element: (
              <Suspense fallback={<PagePreloader />}>
                <ProductPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<PagePreloader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: '/404',
    element: (
      <Suspense fallback={<PagePreloader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
