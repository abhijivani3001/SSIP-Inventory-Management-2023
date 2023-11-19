import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Products from './pages/Products';
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
import RegisterUser from './UserPanel/Admin/RegisterUser';
import AddProducts from './UserPanel/Admin/AddProducts';

import axios from './api/AxiosUrl';
import HeadRequestedOrders from './pages/HeadRequestedOrders/HeadRequestedOrders';
import StoreManagerRequestedOrders from './pages/StoreManagerRequestedOrders/StoreManagerRequestedOrders';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './UserPanel/Admin/AdminDashboard';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import SbsmEmpOrders from './UserPanel/StoreManager/SbsmEmpOrders';
import BudgetPlanning from './pages/BudgetPlanning/BudgetPlanning';

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
      <ToastContainer />
      <Routes>
        {!isLoggedIn && <Route path='/login' element={<Login />} />}
        {!isLoggedIn && <Route path='/' element={<Login />} />}
        {/* {!isLoggedIn && <Route path='/forgot-password' element={<ForgotPassword />} />} */}

        {/* admin */}
        {isLoggedIn && (userRole === ROLES.ADMIN || !isLoading) && (
          <Route path='/register-user' element={<RegisterUser />} />
        )}
        {isLoggedIn && (userRole === ROLES.ADMIN || !isLoading) && (
          <Route path='/add-products' element={<AddProducts />} />
        )}
        {isLoggedIn && userRole === ROLES.ADMIN && (
          <Route path='/dashboard' element={<AdminDashboard />} />
        )}
        {isLoggedIn && userRole === ROLES.ADMIN && (
          <Route path='/' element={<AdminDashboard />} />
        )}
        {isLoggedIn && (userRole === ROLES.ADMIN || !isLoading) && (
          <Route path='/reset-password' element={<ResetPassword />} />
        )}

        {/* --- */}
        {isLoggedIn && <Route path='/user' element={<UserProfile />} />}

        {isLoggedIn && (
          <Route path='/budget-planning' element={<BudgetPlanning />} />
        )}

        {isLoggedIn && userRole !== ROLES.ADMIN && (
          <Route path='/dashboard' element={<Dashboard />} />
        )}
        {isLoggedIn && userRole !== ROLES.ADMIN && (
          <Route path='/' element={<Dashboard />} />
        )}

        {isLoggedIn && userRole !== ROLES.ADMIN && (
          <Route path='/products' element={<Products />} />
        )}
        {isLoggedIn && userRole !== ROLES.ADMIN && (
          <Route path='/cart' element={<CartItems />} />
        )}
        {isLoggedIn && userRole !== ROLES.ADMIN && (
          <Route path='/notification' element={<Notification />} />
        )}

        {isLoggedIn &&
          userRole !== ROLES.ADMIN &&
          (userRole === ROLES.SUB_BRANCH_STORE_MANAGER ||
            userRole === ROLES.BRANCH_STORE_MANAGER ||
            userRole === ROLES.DEPARTMENT_STORE_MANAGER ||
            !isLoading) && <Route path='/inventory' element={<Inventory />} />}

        {isLoggedIn &&
          (userRole === ROLES.SUB_BRANCH_STORE_MANAGER || !isLoading) && (
            <Route path='/sbsm-emp-orders' element={<SbsmEmpOrders />} />
          )}

        {isLoggedIn &&
          userRole !== ROLES.ADMIN &&
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
          userRole !== ROLES.ADMIN &&
          (userRole === ROLES.SUB_BRANCH_HEAD ||
            userRole === ROLES.BRANCH_HEAD ||
            userRole === ROLES.DEPARTMENT_HEAD ||
            !isLoading) && (
            <Route
              path='/head-requested-orders'
              element={<HeadRequestedOrders />}
            />
          )}

        {isLoggedIn && userRole !== ROLES.ADMIN && (
          <Route path='/placed-orders' element={<PlacedOrderList />} />
        )}

        {!isLoading && <Route path='*' element={<NotFound />} />}
      </Routes>
    </Layout>
  );
}
export default App;
