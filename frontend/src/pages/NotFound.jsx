import React from 'react';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div>
        <div className='mt-28 text-6xl font-semibold text-red-600 text-center my-10 align-middle'>
          404 Not Found
        </div>
        <div className='text-center'>
        <Link to='/'>
          <Button>Back to Home</Button>
        </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
