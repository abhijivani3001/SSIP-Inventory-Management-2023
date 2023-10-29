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

  useEffect(() => {
    // Check if a user is authenticated
    if (authCtx.isLoggedIn) {
      // Fetch user data for the currently logged-in user from the API using the user's email
      axios.get(`api/user`)
        .then((response) => {
          const userDataFromAPI = response.data.user;
          setUserData(userDataFromAPI);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [authCtx.isLoggedIn, authCtx.email]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Name:</p>
          <p className="text-gray-900 text-lg font-semibold">{userData.name}</p>
        </div>
        <div>
          <p className="text-gray-600">Email:</p>
          <p className="text-gray-900 text-lg font-semibold">{userData.email}</p>
        </div>
        <div>
          <p className="text-gray-600">Phone:</p>
          <p className="text-gray-900 text-lg font-semibold">{userData.phone}</p>
        </div>
        <div>
          <p className="text-gray-600">Sub Branch:</p>
          <p className="text-gray-900 text-lg font-semibold">{userData.subBranch}</p>
        </div>
        <div>
          <p className="text-gray-600">Branch:</p>
          <p className="text-gray-900 text-lg font-semibold">{userData.branch}</p>
        </div>
        <div>
          <p className="text-gray-600">Department:</p>
          <p className="text-gray-900 text-lg font-semibold">{userData.department}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
