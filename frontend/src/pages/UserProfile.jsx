import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/AxiosUrl';
import AuthContext from '../store/auth-context';
import Loader from '../components/ChakraUI/Loader';

import { Edit, Email } from '../icons/icons';
import { Phone } from '../icons/icons';
import { Calender } from '../icons/icons';

import multiavatar from '@multiavatar/multiavatar';
import DangerousHTML from 'react-dangerous-html';
import ROLES from '../constants/ROLES';

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const setUserIsUpdating = () => {
    setIsUpdating(true);
  };
  const removeUserIsUpdating = () => {
    setIsUpdating(false);
  };

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    subBranch: '',
    branch: '',
    department: '',
    profileIcon: '',
  });

  let svgCode = multiavatar(userData.profileIcon || '66493f858b6dc78b85');

  useEffect(() => {
    axios
      .get(`api/user`)
      .then((response) => {
        const userDataFromAPI = response.data.user;

        setUserData(userDataFromAPI);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      });
  }, []);

  const updateChangesHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put('api/user/', {
        name: userData.name,
        phone: userData.phone,
        role: userData.role,
        subBranch: userData.subBranch,
        branch: userData.branch,
        department: userData.department,
        profileIcon: userData.profileIcon,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    removeUserIsUpdating();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='my-8 mx-4'>
          <div className='relative border flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg mt-24'>
            <div className='flex flex-wrap justify-center bg-slate-100 rounded-t-lg'>
              <div className='w-full p-4 flex justify-center'>
                <div className='w-56 shadow-2xl rounded-full -mt-24'>
                  <DangerousHTML html={svgCode} />
                </div>
              </div>
              <div className='w-full px-4 text-center'>
                <div className='flex justify-center align-middle gap-6 py-4'>
                  <div className='p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-slate-600'>
                      {userData.subBranch}
                    </span>
                    <span className='text-sm text-slate-400'>Sub Branch</span>
                  </div>
                  <div className='p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-slate-600'>
                      {userData.branch}
                    </span>
                    <span className='text-sm text-slate-400'>Branch</span>
                  </div>
                  <div className='p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-slate-600'>
                      {userData.department}
                    </span>
                    <span className='text-sm text-slate-400'>Department</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-center my-8 px-6'>
              <h3 className='text-3xl font-semibold leading-normal mb-8 text-slate-700'>
                {!isUpdating && userData.name}
                {isUpdating && (
                  <>
                    <span className='text-xl'>Name:</span>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      className='w-44 mx-2 py-1 px-2 border text-gray-800 rounded-lg focus:outline-none focus:border-blue-500'
                      placeholder='Enter your name'
                      value={userData.name}
                      onChange={(e) => {
                        setUserData({ ...userData, name: e.target.value });
                      }}
                      required
                    />
                  </>
                )}
                <span className='text-gray-400 text-2xl'>
                  {!isUpdating && <> ({userData.role})</>}
                  {isUpdating && (
                    <select
                      id='role'
                      name='role'
                      className='w-44 mx-2 py-1 px-2 border text-gray-800 rounded-lg focus:outline-none focus:border-blue-500'
                      value={userData.role}
                      onChange={(e) => {
                        setUserData({ ...userData, role: e.target.value });
                      }}
                      required
                    >
                      <option value={ROLES.EMPLOYEE}>Employee</option>
                      <option value={ROLES.SUB_BRANCH_STORE_MANAGER}>
                        Sub Branch Store Manager
                      </option>
                      <option value={ROLES.SUB_BRANCH_HEAD}>
                        Sub Branch Head
                      </option>
                      <option value={ROLES.BRANCH_STORE_MANAGER}>
                        Branch Store Manager
                      </option>
                      <option value={ROLES.BRANCH_HEAD}>Branch Head</option>
                      <option value={ROLES.DEPARTMENT_STORE_MANAGER}>
                        Department Store Manager
                      </option>
                      <option value={ROLES.DEPARTMENT_HEAD}>
                        Department Head
                      </option>
                      <option value='admin'>Admin</option>
                    </select>
                  )}
                </span>
              </h3>
              <div className='flex flex-row justify-evenly align-middle'>
                <div className='flex justify-center gap-2 align-middle'>
                  <Email />
                  <div className='my-auto text-gray-500 text-base font-medium'>
                    {userData.email}
                  </div>
                </div>

                <div className='flex justify-center gap-2 align-middle'>
                  <Phone />
                  {!isUpdating && (
                    <div className='my-auto text-gray-500 text-base font-medium'>
                      {userData.phone}
                    </div>
                  )}
                  {isUpdating && (
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      className='w-44 py-0 px-2 border text-gray-800 rounded-lg focus:outline-none focus:border-blue-500'
                      placeholder='Enter phone number'
                      value={userData.phone}
                      onChange={(e) => {
                        setUserData({ ...userData, phone: e.target.value });
                      }}
                      required
                    />
                  )}
                </div>

                <div className='flex justify-center gap-2 align-middle'>
                  <Calender />
                  <div className='my-auto text-gray-500 text-base font-medium'>
                    {formatDate(userData.createdAt)}
                  </div>
                </div>
              </div>
            </div>
            <div className='px-6 py-10 border-t border-slate-200 text-center'>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full lg:w-9/12 px-4'>
                  {isUpdating && (
                    <button className='blue_btn' onClick={updateChangesHandler}>
                      Save
                    </button>
                  )}
                  {!isUpdating && (
                    <button className='green_btn' onClick={setUserIsUpdating}>
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
