import React from 'react';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${props.bg} ${
        !props.bg ? 'bg-gray-500' : ''
      } hover:bg-gray-800 button ${props.mb}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
