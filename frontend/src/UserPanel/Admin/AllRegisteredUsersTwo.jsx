import React from 'react';

const AllRegisteredUsersTwo = (props) => {
  const userData = props.userData;

  return (
    <>
      <tr className='bg-white text-gray-900 text-base font-normal hover:bg-gray-50 border-b divide-x'>
        <td className='px-6'>{props.index}</td>
        <td className='px-6'>{userData.name}</td>
        <td className='px-6'>{userData.email}</td>
        <td className='px-6'>{userData.subBranch}</td>
        <td className='px-6'>{userData.branch}</td>
        <td className='px-6'>{userData.department}</td>
      </tr>
    </>
  );
};

export default AllRegisteredUsersTwo;
