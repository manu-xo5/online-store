import * as React from 'react';
import { lazy, Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../PRoute/PRoute.index';

import Spinner from '../../pages/loader.page';

import AdminPage from '../../pages/admin.page';
import Home from '../../pages/home.page';
import Search from '../../pages/search.page';
import About from '../../pages/about.page/about.page';
import ScrollToTop from 'components/scroll-to-top';
const Featured = lazy(() => import('../../pages/featured.page'));
const SignIn = lazy(() => import('../../pages/signin.page/signin.page'));
const Profile = lazy(() => import('../../pages/profile.page/profile.page'));
const ProductPage = lazy(() => import('../../pages/product.page/product.page'));

const Routes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/search/:query" component={Search} />
          <Route path="/featured" component={Featured} />
          <ProtectedRoute
            path="/signin"
            component={SignIn}
            whenUserLogged={false}
          />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/products/overview/:pid" component={ProductPage} />
          <ProtectedRoute path="/admin" component={AdminPage} />
        </Switch>
      </ScrollToTop>
    </Suspense>
  );
};

export default Routes;
