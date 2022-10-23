import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductMasterPage from './product-master.page';

const AdminPage = ({ match }) => {
  const { path } = match;
  return (
    <>
      <Routes>
        <Route path={`${path}/product-master`} component={ProductMasterPage} />
      </Routes>
    </>
  );
};

export default AdminPage;
