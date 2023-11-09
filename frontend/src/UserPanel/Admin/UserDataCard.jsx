import React from 'react';

const UserDataCard = (props) => {
  return (
    <div>
      <div>
        {props.user.name}{' '}
        <span className='text-gray-500 text-xl'>({props.user.role})</span>{' '}
      </div>
      <div className='text-xl ml-5'>
        Branch:{' '}
        <span className='text-gray-500 text-xl'>{props.user.branch}</span>
      </div>

      <div className='text-xl ml-5'>
        Email:{' '}
        <span className='text-gray-500 mr-14 text-xl'>{props.user.email}</span>
        Phone: <span className='text-gray-500 text-xl'>{props.user.phone}</span>
      </div>
    </div>
  );
};

export default UserDataCard;
