import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductMasterPage from './product-master.page';

const AdminPage = ({ match }) => {
  const { path } = match;
  return (
    <>
      <Switch>
        <Route path={`${path}/product-master`} component={ProductMasterPage} />
      </Switch>
    </>
  );
};

export default AdminPage;
