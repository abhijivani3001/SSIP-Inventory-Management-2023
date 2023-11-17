import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import UserDataCard from './UserDataCard';
import { FaSearch } from 'react-icons/fa';
import { findBelowUsers } from '../../components/Helper/Helper';

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res1 = await axios.get('api/user');
        const currentUser = await res1.data.user;

        const res2 = await axios.post(
          '/api/user/users',
          findBelowUsers(currentUser)
        );
        const data = await res2.data.users;
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, []);

  const filteredUsers = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone || '').toString().includes(searchTerm)
  );

  return (
    <div className='mx-8 mt-4'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='page-title'>All registered users</h1>
        <div className='flex items-center border rounded-lg px-3'>
          <FaSearch className='text-xl text-gray-700' />
          <input
            type='text'
            placeholder='Search user'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='bg-transparent border-none outline-none mx-2'
          />
        </div>
      </div>
      {isLoading ? (
        <div className='text-xl my-auto mt-8 text-center '>Loading...</div>
      ) : (
        <div className='text-3xl border border-gray-400 py5 px-10 rounded-lg shadow-xl my-10'>
          {filteredUsers.map((user) => (
            <UserDataCard user={user} key={user.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
