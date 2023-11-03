import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Notification from './pages/Notification';
import Layout from './components/Layout/Layout';
import PlacedOrderList from './pages/PlacedOrderList';
import CartItems from './pages/CartItems';
import UserProfile from './pages/UserProfile';
import AuthContext from './store/auth-context';
import Inventory from './pages/Inventory';
import ROLES from './constants/ROLES';

import axios from './api/AxiosUrl';
import HeadRequestedOrders from './pages/HeadRequestedOrders/HeadRequestedOrders';
import StoreManagerRequestedOrders from './pages/StoreManagerRequestedOrders/StoreManagerRequestedOrders';
import Dashboard from './pages/Dashboard';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`api/user`)
        .then((response) => {
          const userDataFromAPI = response.data.user;
          setUserRole(userDataFromAPI.role);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
    setIsLoading(false);
  }, [isLoggedIn]);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />

        {!isLoggedIn && <Route path='/login' element={<Login />} />}
        {isLoggedIn && <Route path='/user' element={<UserProfile />} />}
        {isLoggedIn && <Route path='/dashboard' element={<Dashboard />} />}
        {isLoggedIn && <Route path='/products' element={<Products />} />}
        {isLoggedIn && <Route path='/cart' element={<CartItems />} />}
        {isLoggedIn && (
          <Route path='/notification' element={<Notification />} />
        )}

        {isLoggedIn &&
          (userRole === ROLES.SUB_BRANCH_STORE_MANAGER ||
            userRole === ROLES.BRANCH_STORE_MANAGER ||
            userRole === ROLES.DEPARTMENT_STORE_MANAGER ||
            !isLoading) && <Route path='/inventory' element={<Inventory />} />}

        {isLoggedIn &&
          (userRole === ROLES.SUB_BRANCH_STORE_MANAGER ||
            userRole === ROLES.BRANCH_STORE_MANAGER ||
            userRole === ROLES.DEPARTMENT_STORE_MANAGER ||
            !isLoading) && (
            <Route
              path='/store-manager-requested-orders'
              element={<StoreManagerRequestedOrders />}
            />
          )}

        {isLoggedIn &&
          (userRole === ROLES.SUB_BRANCH_HEAD ||
            userRole === ROLES.BRANCH_HEAD ||
            userRole === ROLES.DEPARTMENT_HEAD ||
            !isLoading) && (
            <Route
              path='/head-requested-orders'
              element={<HeadRequestedOrders />}
            />
          )}

        {isLoggedIn && (
          <Route path='/placed-orders' element={<PlacedOrderList />} />
        )}

        {!isLoading && <Route path='*' element={<NotFound />} />}
      </Routes>
    </Layout>
  );
}
export default App;
