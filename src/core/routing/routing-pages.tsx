import { lazy } from 'react';

const RegistrationPage = lazy(() => import('@pages/Registration/Registration.page'));
const AboutPage = lazy(() => import('@pages/About/About.page'));
const CartPage = lazy(() => import('@pages/Cart/Cart.page'));
const CatalogPage = lazy(() => import('@pages/Catalog/Catalog.page'));
const ProductPage = lazy(() => import('@pages/Product/Product.page'));
const LoginPage = lazy(() => import('@pages/Login/Login.page'));
const MainPage = lazy(() => import('@pages/Main/Main.page'));
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFound.page'));
const ProfilePage = lazy(() => import('@pages/Profile/Profile.page'));
const SearchPage = lazy(() => import('@pages/Search/Search.page'));

export {
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
  AboutPage,
  CartPage,
  CatalogPage,
  ProductPage,
  SearchPage,
};
