import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/AxiosUrl';
import AuthContext from '../store/auth-context';

const UserProfile = () => {
  const authCtx = useContext(AuthContext);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    subBranch: '',
    branch: '',
    department: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      axios
        .get(`api/user`)
        .then((response) => {
          const userDataFromAPI = response.data.user;
          console.log(userDataFromAPI);
          setUserData(userDataFromAPI);
          setIsLoading(false); // Data has loaded
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoading(false); // Data has failed to load
        });
    }
  }, [authCtx.isLoggedIn, authCtx.email]);

  return (
    <div className='p-4 bg-white rounded-lg shadow-lg'>
      <h1 className='text-2xl font-semibold mb-4'>User Profile</h1>
      {isLoading ? ( // Show loading indicator while data is being fetched
        <p>Loading...</p>
      ) : (
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-gray-600'>Name:</p>
            <p className='text-gray-900 text-lg font-semibold'>{userData.name}</p>
          </div>
          <div>
            <p className='text-gray-600'>Email:</p>
            <p className='text-gray-900 text-lg font-semibold'>{userData.email}</p>
          </div>
          <div>
            <p className='text-gray-600'>Phone:</p>
            <p className='text-gray-900 text-lg font-semibold'>{userData.phone}</p>
          </div>
          <div>
            <p className='text-gray-600'>Sub Branch:</p>
            <p className='text-gray-900 text-lg font-semibold'>{userData.subBranch}</p>
          </div>
          <div>
            <p className='text-gray-600'>Branch:</p>
            <p className='text-gray-900 text-lg font-semibold'>{userData.branch}</p>
          </div>
          <div>
            <p className='text-gray-600'>Department:</p>
            <p className='text-gray-900 text-lg font-semibold'>{userData.department}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
