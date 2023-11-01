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

import axios from './api/AxiosUrl';
import RequestedOrderList from './pages/RequestedOrderList';

function App() {
  const USER = {
    EMPLOYEE: 'employee',
    SUB_BRANCH_STORE_MANAGER: 'sub-branch-store-manager',
    SUB_BRANCH_HEAD: 'sub-branch-head',
    BRANCH_STORE_MANAGER: 'branch-store-manager',
    BRANCH_HEAD: 'branch-head',
    DEPARTMENT_STORE_MANAGER: 'department-store-manager',
    DEPARTMENT_HEAD: 'department-head',
    ADMIN: 'admin',
  };

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [userRole, setUserRole] = useState('');

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
  }, [isLoggedIn]);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        {!isLoggedIn && <Route path='/login' element={<Login />} />}
        {isLoggedIn && <Route path='/user' element={<UserProfile />} />}
        {isLoggedIn && <Route path='/products' element={<Products />} />}
        {isLoggedIn && <Route path='/cart' element={<CartItems />} />}
        {isLoggedIn && (
          <Route path='/notification' element={<Notification />} />
        )}
        {isLoggedIn &&
          (userRole === USER.SUB_BRANCH_STORE_MANAGER ||
            userRole === USER.BRANCH_STORE_MANAGER ||
            userRole === USER.DEPARTMENT_STORE_MANAGER) && (
            <Route path='/inventory' element={<Inventory />} />
          )}
        {isLoggedIn && userRole !== USER.EMPLOYEE && (
          <Route path='/requested-order-list' element={<RequestedOrderList />} />
        )}
        {isLoggedIn && (
          <Route path='/placed-order-list' element={<PlacedOrderList />} />
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
export default App;
