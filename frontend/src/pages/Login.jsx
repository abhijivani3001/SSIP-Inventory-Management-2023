import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import axios from '../api/AxiosUrl';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post('/api/user/login', {
        email: username,
        password: password,
      });
      const data = await res.data;

      if (data.success === true) {
        alert('Login Successfully');
        authCtx.login(data.token);
        navigate('/');

        window.location.reload(); // bad-practice
      } else {
        alert('Login failed');
      }
    } catch (err) {
      alert('Error, please try again');
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
              type='text'
              id='username'
              name='username'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your email here'
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
