import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import { FaSearch } from 'react-icons/fa';
import ROLES from '../../constants/ROLES';
// import UserDataCardBsm from './UserDataCardBsm';
import UserDataCardSbh from './UserDataCardSbh';
import Loader from '../../components/ChakraUI/Loader';

const SbsmHeadEmpOrders = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res1 = await axios.get('api/user');
        const currentUser = await res1.data.user;

        const res2 = await axios.post('/api/user/users', {
          role: [ROLES.SUB_BRANCH_STORE_MANAGER, ROLES.EMPLOYEE],
        });
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

  const roleWiseUsers = {};
  filteredUsers.forEach((user) => {
    const { role } = user;
    if (!roleWiseUsers[role]) {
      roleWiseUsers[role] = [];
    }
    roleWiseUsers[role].push(user);
  });

  const branchWiseUsers = selectedBranch
    ? filteredUsers.filter((user) => user.branch === selectedBranch)
    : filteredUsers;

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='mx-8 mt-4'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='page-title'>All registered users</h1>
            <div className='flex items-center'>
              <label htmlFor='roleSelect' className='mr-2 text-lg'>
                Select Role:
              </label>
              <select
                id='roleSelect'
                value={selectedRole}
                onChange={handleRoleChange}
                className='p-2 border rounded-lg'
              >
                <option value=''>All</option>
                {Object.keys(roleWiseUsers).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex items-center'>
              <label htmlFor='branchSelect' className='mr-2 text-lg'>
                Select Branch:
              </label>
              <select
                id='branchSelect'
                value={selectedBranch}
                onChange={handleBranchChange}
                className='p-2 border rounded-lg'
              >
                <option value=''>All</option>
                {Array.from(
                  new Set(filteredUsers.map((user) => user.branch))
                ).map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
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
          <div className='text-3xl border border-gray-400 py5 px-10 rounded-lg shadow-xl my-10'>
            <UserDataCardSbh
              users={roleWiseUsers[selectedRole] || branchWiseUsers}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SbsmHeadEmpOrders;
