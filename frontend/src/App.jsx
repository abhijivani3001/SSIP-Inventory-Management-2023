import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';

import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom'; // If using React Router

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  );
}
export default App;
