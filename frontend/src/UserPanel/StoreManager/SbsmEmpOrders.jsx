import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import UserDataCardSbsm from './UserDataCardSbsm';
import { FaSearch } from 'react-icons/fa';
import { findBelowUsers } from '../../components/Helper/Helper';

const SbsmEmpOrder = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

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

  const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.phone || '').toString().includes(searchTerm)
  );

  const roleWiseUsers = {};
  filteredUsers.forEach((user) => {
    const { role } = user;
    if (!roleWiseUsers[role]) {
      roleWiseUsers[role] = [];
    }
    roleWiseUsers[role].push(user);
  });

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className='mx-8 mt-4'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='page-title'>All registered users</h1>
        <div className='flex items-center'>
          <label htmlFor="roleSelect" className='mr-2 text-lg'>Select Role:</label>
          <select
            id="roleSelect"
            value={selectedRole}
            onChange={handleRoleChange}
            className='p-2 border rounded-lg'
          >
            <option value="">All</option>
            {Object.keys(roleWiseUsers).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
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
          <UserDataCardSbsm users={roleWiseUsers[selectedRole] || filteredUsers} />
        </div>
      )}
    </div>
  );
};

export default SbsmEmpOrder;
