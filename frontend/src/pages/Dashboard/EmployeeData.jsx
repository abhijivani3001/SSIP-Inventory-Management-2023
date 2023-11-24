import React, { useState } from 'react';
import ROLES from '../../constants/ROLES';
import AllRegisteredUsersTwo from '../../UserPanel/Admin/AllRegisteredUsersTwo';
import EmployeeDataTwo from './EmployeeDataTwo';

const EmployeeData = (props) => {
  const [index, setIndex] = useState(1);

  return (
    <>
      <div className='text-lg text-center mb-6 font-semibold text-gray-700 uppercase'>
        Employees under your branch
      </div>

      <div className='relative overflow-x-auto shadow-sm border'>
        <table className='w-full divide-y text-left text-gray-500'>
          <thead className='text-base text-gray-700 uppercase bg-slate-100'>
            <tr className='divide-x'>
              <th scope='col' className='px-6 py-1 w-32'>
                Sr. no
              </th>
              <th scope='col' className='px-6 py-1 w-[24rem]'>
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
            {props.userData.map((user, arrayIndex) => {
              // const currentIndex = index + 1;
              const currentIndex = index + arrayIndex;

              return (
                <EmployeeDataTwo
                  key={user.id}
                  userData={user}
                  index={currentIndex}
                />
                // <></>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeData;
