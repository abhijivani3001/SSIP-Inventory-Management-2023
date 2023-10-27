import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // If using React Router

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './components/Login';
import Notification from './pages/Notification';

import OrderList from './pages/OrderList';
import CartItems from './pages/CartItems';

function App() {
  return (
    <>
      <Navbar />
      <div className='border-2 border-gray-500 mx-8'></div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<CartItems />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/order-list' element={<OrderList />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
