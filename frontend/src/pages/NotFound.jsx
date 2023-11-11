import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div>
        <div className='mt-28 text-6xl font-semibold text-red-600 text-center my-10 align-middle'>
          404 Not Found
        </div>
        <div className='text-center'>
          <Link to='/dashboard'>
            <button className='blue_btn'>Back to Dashboard</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
