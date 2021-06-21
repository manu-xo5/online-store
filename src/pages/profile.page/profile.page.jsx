import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import './profile.styles.scss';

import BasicInfoPage from './components/basic-info';
import CartPage from './components/cart-page';
import { Input, Button } from '../../components/Form';
import { useUser } from '../../context/user';
import DeliveryStatusPage from './orders.page/delivery-status.page/delivery-status.page';

const AvatarDefault = '/static/img/avatar.png';

const RedeemPage = () => (
  <main id="redeem">
    <p>
      Um is that it has a more-or-less normal distribution of letters, as
      opposed to using 'Content here, content here', making it look like
      readable English. Many desktop publishing packages and web page editors
      now use Lorem Ipsum as their default model text, and a search for 'lorem
      ipsum' will uncover many web sites still in their infancy.
    </p>
    <br />
    <Input label="Redeem Code" />
    <Button.Primary type="button">Redeem</Button.Primary>
  </main>
);

const ProfilePage = (props) => {
  const { currentUser } = useUser().userState;

  return (
    <main id="profile">
      <div className="profile__sidebar">
        <img src={AvatarDefault} alt="avator" />
        <div>
          <h2>{currentUser.displayName}</h2>
          <h4>Rs. {currentUser.balance}</h4>
          <p>balance</p>
        </div>
        <Sidebar />
      </div>
      <section className="container">
        <Switch>
          <Route path="/profile/basicinfo" component={BasicInfoPage} />
          <Route path="/profile/cart" component={CartPage} />
          <Route
            path="/profile/orders/delivery-status"
            component={DeliveryStatusPage}
          />
          {/* <Route path="/profile/orders" component={OrdersPage} /> */}
          <Route path="/profile/redeem" component={RedeemPage} />
          <Route
            path="/profile/signout"
            render={() => {
              return <Redirect to="/" />;
            }}
          />
          <Route path="*">
            <Redirect to="/profile/basicinfo" />
          </Route>
        </Switch>
      </section>
    </main>
  );
};

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/profile/basicinfo">Basic</Link>
        </li>
        <li>
          <Link to="/profile/cart">Cart</Link>
        </li>
        <li>
          <Link to="/profile/redeem">Redeem</Link>
        </li>
        <li>
          <Link to="/profile/orders">Orders</Link>
        </li>
        <li>
          <Link to="/profile/signout">Sign Out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default ProfilePage;
