import React, { useState } from 'react';
import ROLES from '../../constants/ROLES';
import AllRegisteredUsersTwo from './AllRegisteredUsersTwo';

const AllRegisteredUsers = (props) => {
  const [index, setIndex] = useState(1);

  return (
    <>
      {Object.entries(ROLES).map(([key, value]) => {
        let flag = false;
        let roleIndex = 0;

        props.userData.forEach((user) => {
          if (value === user.role) {
            flag = true;
          }
        });

        return (
          <>
            {flag && (
              <div
                className='my-4 bg-white border rounded-lg p-4 shadow-md'
                key={key}
              >
                <div className='text-lg font-semibold text-gray-700 uppercase'>
                  {value}
                </div>

                {flag && (
                  <div className='relative overflow-x-auto shadow-sm border'>
                    <table className='w-full divide-y text-left text-gray-500'>
                      <thead className='text-base text-gray-700 uppercase bg-slate-100'>
                        <tr className='divide-x'>
                          <th scope='col' className='px-6 py- w-32'>
                            Sr. no
                          </th>
                          <th scope='col' className='px-6 py-1'>
                            Name
                          </th>
                          <th scope='col' className='px-6 py-1 w-1/5'>
                            Email
                          </th>
                          <th scope='col' className='px-6 py-1 w-[16rem]'>
                            Sub-branch
                          </th>
                          <th scope='col' className='px-6 py-1 w-[16rem]'>
                            Branch
                          </th>
                          <th scope='col' className='px-6 py-1 w-[16rem]'>
                            Department
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.userData.map((user) => {
                          if (value === user.role) {
                            flag = true;
                            const currentIndex = index + roleIndex;
                            roleIndex++;

                            return (
                              <AllRegisteredUsersTwo
                                key={user.id}
                                userData={user}
                                index={currentIndex}
                              />
                            );
                          }
                          return null;
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        );
      })}
    </>
  );
};

export default AllRegisteredUsers;
