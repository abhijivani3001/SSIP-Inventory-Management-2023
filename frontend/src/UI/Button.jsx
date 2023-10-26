import React from 'react';

const Button = (props) => {
  return (
    <button className='text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center'>
      {props.children}
    </button>
  );
};

export default Button;
