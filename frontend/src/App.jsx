import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './components/Login';
import Notification from './pages/Notification';
import Layout from './components/Layout/Layout';
import PlacedOrderList from './pages/PlacedOrderList';
import OrderList from './pages/OrderList';
import CartItems from './pages/CartItems';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<CartItems />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/order-list' element={<OrderList />} />
        <Route path='/placed-order-list' element={<PlacedOrderList />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
export default App;
