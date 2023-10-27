import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed inset-0 flex items-center justify-center z-50`}
    >
      <div className='bg-white w-96 p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold text-black mb-4 min-w-0 flex items-center justify-center'>
          {' '}
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className='block text-gray-800'>Enrollment</label>
            <input
              type='string'
              id='username'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-lg'
            >
              Login
            </button>
          </div>
        </form>
        <div className='text-center mt-4'>
          <Link
            to='/'
            onClick={onClose}
            className='text-gray-700 hover:underline cursor-pointer'
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
