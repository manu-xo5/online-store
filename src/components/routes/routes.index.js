import * as React from 'react';
import { lazy, Suspense } from 'react';

import Nav from '../Nav/nav.component';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import ProtectedRoute from '../PRoute/PRoute.index';

import Spinner from '../../pages/loader.page';

import AdminPage from '../../pages/admin.page';
import Home, { HomeErrorBoundary, homeLoader } from '../../pages/home.page';
// import Home from "pages/home2.page"
import Search, { searchLoader, searchAction } from '../../pages/search.page';
import About from '../../pages/about.page/about.page';
import ScrollToTop from 'components/scroll-to-top';
import { useUser } from 'context/user';
import {
  productAction,
  productLoader,
  productPageAction,
} from 'pages/product.page/product.page';
import ProductMasterPage from 'pages/admin.page/product-master.page';
import BasicInfoPage from 'pages/profile.page/components/basic-info';
import CartPage from 'pages/profile.page/components/cart-page';
import DeliveryStatusPage from 'pages/profile.page/orders.page/delivery-status.page';
import { RedeemPage } from 'pages/profile.page/profile.page';
import Footer from 'components/Footer';
import OrdersPage from 'pages/profile.page/orders.page';
const Featured = lazy(() => import('../../pages/featured.page'));
const SignIn = lazy(() => import('../../pages/signin.page/signin.page'));
const Profile = lazy(() => import('../../pages/profile.page/profile.page'));
const ProductPage = lazy(() => import('../../pages/product.page/product.page'));

const router = createBrowserRouter([
  { path: 'profile/cart', element: <CartPage /> },
  {
    path: '*',
    element: (
      <ScrollToTop>
        <Nav />
        <Outlet />
        <Footer />
      </ScrollToTop>
    ),
    children: [
      {
        path: '',
        element: <Home />,
        loader: homeLoader,
        errorElement: <HomeErrorBoundary />,
      },

      { path: 'about', element: <About /> },
      {
        path: 'search/:query',
        element: <Search />,
        loader: searchLoader,
        action: searchAction,
      },
      { path: 'featured', element: <Featured /> },
      { path: 'signin', element: <SignIn /> },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          { path: 'basicinfo', element: <BasicInfoPage /> },
          {
            path: 'orders',
            element: <OrdersPage />,
          },
          {
            path: 'orders/delivery-status',
            element: <DeliveryStatusPage />,
          },
          { path: 'redeem', element: <RedeemPage /> },
          { path: 'signout', element: <></> },
        ],
      },
      {
        path: 'products/overview/:pid',
        element: <ProductPage />,
        loader: productLoader,
      },
      {
        path: 'admin/product-master',
        element: (
          <ProtectedRoute>
            <ProductMasterPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const MyRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default MyRoutes;
