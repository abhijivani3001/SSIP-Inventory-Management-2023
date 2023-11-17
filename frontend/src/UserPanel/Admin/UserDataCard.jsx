import React, { useState } from 'react';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
  return formattedDate;
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
      {showDetails && (
        <div className="mt-3">
          {/* <h3 className="text-xl font-semibold mb-2">Placed Order List: </h3> */}
          <table className="w-full border-collapse border border-gray-400 mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-2 text-xl">Order Name</th>
                <th className="border border-gray-400 p-2 text-xl">Quantity</th>
                <th className="border border-gray-400 p-2 text-xl">Date</th>
              </tr>
            </thead>
            <tbody>
              {props.user.bulkOrders.map((bulkOrder) => (
                bulkOrder.orders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="border border-gray-400 p-2 text-xl">{order.name}</td>
                    <td className="border border-gray-400 p-2 text-xl">{order.quantity}</td>
                    <td className="border border-gray-400 p-2 text-xl">{formatDate(bulkOrder.updatedAt)}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDataCard;
