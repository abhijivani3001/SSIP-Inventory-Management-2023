import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/AxiosUrl';
import ROLES from '../../constants/ROLES';
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
    role: 'employee',
    profileIcon: '',
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

        // Clear the form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          subBranch: '',
          branch: '',
          department: '',
          role: 'employee',
          profileIcon: '',
        });
      } else {
        alert('Registration failed');
      }
    } catch (err) {
      alert('Error, please try again');
    }
  };

  // for user profile icon
  const generateRandomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };

  useEffect(() => {
    const randomString = generateRandomString(15);
    if (!formData.profileIcon) {
      setFormData({ ...formData, profileIcon: randomString });
    }
  }, []);

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
            <label className='block text-gray-800' for='role'>
              Role
            </label>
            <select
              id='role'
              name='role'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              onChange={handleChange}
              required
            >
              <option value={ROLES.EMPLOYEE}>Employee</option>
              <option value={ROLES.SUB_BRANCH_STORE_MANAGER}>
                Sub Branch Store Manager
              </option>
              <option value={ROLES.SUB_BRANCH_HEAD}>Sub Branch Head</option>
              <option value={ROLES.BRANCH_STORE_MANAGER}>
                Branch Store Manager
              </option>
              <option value={ROLES.BRANCH_HEAD}>Branch Head</option>
              <option value={ROLES.DEPARTMENT_STORE_MANAGER}>
                Department Store Manager
              </option>
              <option value={ROLES.DEPARTMENT_HEAD}>Department Head</option>
              <option value='admin'>Admin</option>
            </select>
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
