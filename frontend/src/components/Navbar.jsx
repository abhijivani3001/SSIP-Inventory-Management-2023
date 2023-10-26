import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';

function Navbar() {

  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const openLoginForm = () => {
    setIsLoginFormOpen(true);
  };

  const closeLoginForm = () => {
    setIsLoginFormOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
      <div>
        <Link to="/dashboard" className="hover:underline">Inventory Management</Link>
      </div>
      <ul className="flex space-x-4 text-white">
        <div className="flex space-x-4 justify-items-start">
          <li>
            <Link to="./Home.js" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/About" className="hover:underline">About</Link>
          </li>
        </div>
        <div className="ml-auto">
          <li>
            <Link to="./Login.js" className="hover:underline" onClick={openLoginForm}>Login</Link>
            <Login isOpen={isLoginFormOpen} onClose={closeLoginForm} />
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
