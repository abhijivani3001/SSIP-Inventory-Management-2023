import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../store/auth-context';
import axios from '../api/AxiosUrl';
import { LuRefreshCcw } from 'react-icons/lu';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [userCaptchaValue, setUserCaptchaValue] = useState('');
  const [expectedCaptchaValue, setExpectedCaptchaValue] = useState('');
  const [captchaData, setCaptchaData] = useState('');
  const authCtx = useContext(AuthContext);


  useEffect(() => {
    // Fetch captcha when component mounts
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const response = await axios.get('/api/captcha');
      const captchaData = response.data;
      console.log(response);

      if (captchaData.success) {
        setExpectedCaptchaValue(captchaData.text);
        setCaptchaData(captchaData);
      } else {
        console.error('Failed to fetch captcha');
      }
    } catch (error) {
      console.error('Error fetching captcha:', error);
    }
  };

  const showToast = (message, type) => {
    toast[type](message, { position: toast.POSITION.TOP_CENTER });
  };

  useEffect(() => {
    // Close toast when isLoggedIn changes
    if (authCtx.isLoggedIn) {
      const closeToast = () => toast.dismiss();
      setTimeout(closeToast, 3000); // Adjust the timeout as needed
    }
  }, [authCtx.isLoggedIn]);

  const submitHandler = async (event) => {
    event.preventDefault();

    console.log(userCaptchaValue, expectedCaptchaValue);
    if (userCaptchaValue !== expectedCaptchaValue) {
      showToast('Captcha verification failed. Please try again.', 'error');
      return;
    }

    // Check if the entered captcha value matches the expected captcha value
    // if (userCaptchaValue?.toLowerCase() !== expectedCaptchaValue?.toLowerCase()) {
    //   showToast('Captcha verification failed. Please try again.', 'error');
    //   return;
    // }

    try {
      const res = await axios.post('/api/user/login', {
        email: username,
        password: password,
      });
      const data = await res.data;

      if (data.success === true) {
        showToast('Login Successful', 'success');
        authCtx.login(data.token);
        navigate('/');
      } else {
        showToast('Login failed. Please check your credentials.', 'error');
      }
    } catch (err) {
      showToast('Error. Please try again.', 'error');
    }

    setUsername('');
    setPassword('');
    setUserCaptchaValue('');

    // Fetch a new captcha after form submission
    fetchCaptcha();

    // Adjust the timeout as needed
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
  };

  return (
    <div className='inset-0 flex bg-gray-50 flex-col items-center justify-center p-8'>
      <div className='bg-white w-96 p-8 rounded-lg shadow-lg'>
        <div className='mb-2 flex justify-center'>
          <img
            src='https://cracku.in/latest-govt-jobs/wp-content/uploads/2019/07/Government-of-India.jpg'
            height='30px'
            width='100px'
            alt='Government of India'
          />
        </div>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4 min-w-0 flex items-center justify-center'>
          LOGIN
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
          <div className='mb-4'>
      <label htmlFor='captcha' className='block text-gray-700'>
        Captcha
      </label>
      <div className='flex items-end'>
        <img className='mb-3' src={`data:image/svg+xml;base64,${btoa(captchaData.data)}`} alt='captcha' />
        <LuRefreshCcw
          className='mb-4 ml-4 text-3xl cursor-pointer'
          onClick={fetchCaptcha}
        />
      </div>
      <input
        type='text'
        id='captcha'
        name='captcha'
        className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
        placeholder='Enter the characters above'
        value={userCaptchaValue}
        onChange={(e) => setUserCaptchaValue(e.target.value)}
        required
      />
    </div>
          <div className='text-center mt-7'>
            <button type='submit' className='blue_btn'>
              Login
            </button>
          </div>

          <div className='text-center mt-3'>
            <Link
              to='/forgot-password'
              className='text-blue-600 hover:underline'
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
