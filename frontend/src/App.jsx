import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Notification from './pages/Notification';
import Layout from './components/Layout/Layout';
import PlacedOrderList from './pages/PlacedOrderList';
import OrderList from './pages/OrderList';
import CartItems from './pages/CartItems';
import UserProfile from './pages/UserProfile';
import AuthContext from './store/auth-context';
import Inventory from './pages/Inventory';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        {!isLoggedIn && <Route path='/login' element={<Login />} />}
        {isLoggedIn && <Route path='/user' element={<UserProfile />} />}
        {isLoggedIn && <Route path='/products' element={<Products />} />}
        {isLoggedIn && <Route path='/inventory' element={<Inventory />} />}
        {isLoggedIn && <Route path='/cart' element={<CartItems />} />}
        {isLoggedIn && (
          <Route path='/notification' element={<Notification />} />
        )}
        {isLoggedIn && <Route path='/order-list' element={<OrderList />} />}
        {isLoggedIn && (
          <Route path='/placed-order-list' element={<PlacedOrderList />} />
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
export default App;
