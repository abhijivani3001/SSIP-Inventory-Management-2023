import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/AxiosUrl';
import 'react-toastify/dist/ReactToastify.css';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    subBranch: '',
    branch: '',
    department: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/user/register', formData);
      const data = await res.data;

      if (data.success === true) {
        alert('Registration Successful');
      } else {
        alert('Registration failed');
      }
    } catch (err) {
      alert('Error, please try again');
    }
  };

  return (
    <div className='inset-0 flex items-center justify-center p-8'>
      <div className='bg-white text-xl text-gray-800 font-semibold w-1/3 p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4 min-w-0 flex items-center justify-center'>
          Register User
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-800'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800'>Phone</label>
            <input
              type='tel'
              id='phone'
              name='phone'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your phone number'
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              autoComplete='on'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800'>Sub Branch</label>
            <input
              type='text'
              id='subBranch'
              name='subBranch'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your sub branch'
              value={formData.subBranch}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800'>Branch</label>
            <input
              type='text'
              id='branch'
              name='branch'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your branch'
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800'>Department</label>
            <input
              type='text'
              id='department'
              name='department'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your department'
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800'>Role</label>
            <input
              type='text'
              id='role'
              name='role'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your role'
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex justify-center align-middle gap-2'>
            <button type='submit' className='blue_btn'>
              Register
            </button>

            <div className='my-auto'>
              <Link to='/' className='trans_btn'>
                Close
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
