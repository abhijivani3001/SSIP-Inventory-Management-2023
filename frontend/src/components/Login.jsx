import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const Login = () => {
  const navigate=useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authCtx=useContext(AuthContext);

  const users = [{ username: 'abhi', password: '123' }];

  const submitHandler = (event) => {
    event.preventDefault();
    
    console.log(username, password);
    if(username===users[0].username && password===users[0].password){
      authCtx.login('token1');
      navigate('/');
    }
    else{
      alert('user not exist')
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className='inset-0 flex items-center justify-center p-16'>
      <div className='bg-white w-96 p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold text-black mb-4 min-w-0 flex items-center justify-center'>
          Login
        </h2>
        <form onSubmit={submitHandler}>
          <div className='mb-4'>
            <label className='block text-gray-800'>Username</label>
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
              autoComplete='on'
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
              className='bg-gray-800 text-white border-2 hover:bg-gray-700 py-1.5 px-6 rounded-lg'
            >
              Login
            </button>
          </div>
          <div className='text-center mt-4'>
            <Link
              to='/'
              className='text-gray-700 border-2 hover:bg-gray-100 py-1.5 px-6 rounded-lg'
            >
              Close
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
