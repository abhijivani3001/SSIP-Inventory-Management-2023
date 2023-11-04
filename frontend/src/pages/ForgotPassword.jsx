import React, { useState } from 'react';
import axios from '../api/AxiosUrl';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a reset password request to the server
      const response = await axios.post('/api/user/password', {
        email_id: email,
        newPassword: newPassword,
      });
      console.log(response);

      if (response.data.success) {
        // Show success alert
        alert('Please check your email to verify!');
      } else {
        // Handle reset password failure, show an error message
        alert('Failed to update password. Please try again.');
      }
    } catch (error) {
      // Handle error, show an error message
      alert('An error occurred. Please try again later.');
    }

    // Reset form fields
    setEmail('');
    setNewPassword('');
  };

  return (
    <div className='inset-0 flex items-center justify-center p-16'>
      <div className='bg-white w-96 p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold text-black mb-4 min-w-0 flex items-center justify-center'>
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-800'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800'>New Password</label>
            <input
              type='password'
              id='newPassword'
              name='newPassword'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter your new password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='bg-gray-800 text-white border-2 hover:bg-gray-700 py-1.5 px-6 rounded-lg'
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;