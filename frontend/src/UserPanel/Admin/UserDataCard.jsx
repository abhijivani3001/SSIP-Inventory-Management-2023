import React, { useState } from 'react';

const OrderList = (props) => {
  // Logic to fetch and display order list for the user
  return (
    <div className="mt-3">
      {/* Display the order list */}
      <h3 className="text-xl font-semibold mb-2">Placed Order List: </h3>
      {/* Include your logic to render the order details */}
      <p className='text-xl font-semibold'>Loarem ipsum dolor sit amet consectetur adipisicing elit. Quaerat fugiat minima eius tempora excepturi voluptatibus placeat, amet aut nostrum totam ullam doloribus libero officiis. Eius laborum accusamus expedita aliquam eum sunt incidunt eaque, provident iste voluptatibus, ad debitis maiores maxime repudiandae modi tempore voluptatem perferendis necessitatibus dolore dolor deleniti accusantium odio. Nam enim nemo autem.</p>
      {/* ... */}
    </div>
  );
};

const UserDataCard = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  return (
    <div>
      <div className='p-2 flex justify-between items-center'>
        <div>
          <div className='mx-1 p-1'>
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
        <div>
          <button
            onClick={handleViewDetails}
            className='bg-blue-500  text-gray-900 text-xl px-1 py-1 rounded-xl m-3 p-1'
          >
            {showDetails ? 'View Less' : 'View Details'}
          </button>
        </div>
      </div>
      {showDetails && <OrderList />}
    </div>
  );
};

export default UserDataCard;