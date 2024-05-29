import { lazy } from 'react';

const RegistrationPage = lazy(() => import('@pages/Registration/Registration.page'));
const AboutPage = lazy(() => import('@pages/About/About.page'));
const BucketPage = lazy(() => import('@pages/Bucket/Bucket.page'));
const CartPage = lazy(() => import('@pages/Cart/Cart.page'));
const CatalogPage = lazy(() => import('@pages/Catalog/Catalog.page'));
const LoginPage = lazy(() => import('@pages/Login/Login.page'));
const MainPage = lazy(() => import('@pages/Main/Main.page'));
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFound.page'));
const ProfilePage = lazy(() => import('@pages/Profile/Profile.page'));

export {
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
  AboutPage,
  BucketPage,
  CartPage,
  CatalogPage,
};
