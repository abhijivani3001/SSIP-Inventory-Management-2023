import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosUrl';
import UserDataCard from './UserDataCard';

const AdminDashboard = () => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res2 = await axios.post('/api/user/users', {
          role: 'admin',
        });
        console.log(res2);
        const data = await res2?.data?.users;
        console.log(data);

        setUserData(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className='mx-8 mt-4'>
      <div>
        <h1 className='page-title'>All registered users</h1>
      </div>
      {isLoading && (
        <div className='text-xl my-auto mt-8 text-center '>Loading...</div>
      )}
      {!isLoading && (
        <div className='text-3xl mx-40 border border-gray-400 py-5 px-10 rounded-lg shadow-xl my-10'>
          {userData.map((user) => (
            <UserDataCard user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
