import React, { useState } from 'react';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
  return formattedDate;
};

const UserDataCardSbsm = (props) => {
  const [showDetails, setShowDetails] = useState(props.users.map(() => false));

  const handleViewDetails = (index) => {
    setShowDetails((prevShowDetails) => {
      const newShowDetails = [...prevShowDetails];
      newShowDetails[index] = !newShowDetails[index];
      return newShowDetails;
    });
  };

  return (
    <div>
      {props.users.map((user, index) => (
        <div key={index}>
          <div className='p-2 flex justify-between items-center'>
            <div>
              <div className='mx-0 p-1'>
                {user.name} <span className='text-gray-500 text-xl'>({user.role})</span>{' '}
              </div>
              <div className='text-xl ml-7'>
                Branch: <span className='text-gray-500 text-xl '>{user.branch}</span>
              </div>
              <div className='text-xl ml-7'>
                Email: <span className='text-gray-500 mr-14 text-xl'>{user.email}</span>
                Phone: <span className='text-gray-500 text-xl'>{user.phone}</span>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleViewDetails(index)}
                className='bg-blue-500 text-gray-900 text-xl px-1 py-1 rounded-xl m-3 p-1'
              >
                {showDetails[index] ? 'View Less' : 'View Details'}
              </button>
            </div>
          </div>
          {showDetails[index] && (
            <div className="mt-3">
              {user.bulkOrders.length > 0 ? (
                <table className="w-full border-collapse border border-gray-400 mt-2">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 p-2 text-xl">Order Name</th>
                      <th className="border border-gray-400 p-2 text-xl">Quantity</th>
                      <th className="border border-gray-400 p-2 text-xl">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.bulkOrders
                      .flatMap((bulkOrder) =>
                        bulkOrder.orders.reduce((acc, order) => {
                          const existingOrder = acc.find(
                            (mergedOrder) =>
                              mergedOrder.name === order.name &&
                              formatDate(mergedOrder.date) === formatDate(bulkOrder.updatedAt)
                          );
                          if (existingOrder) {
                            existingOrder.quantity += order.quantity;
                          } else {
                            acc.push({ ...order, date: bulkOrder.updatedAt });
                          }
                          return acc;
                        }, [])
                      )
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map((mergedOrder, orderIndex) => (
                        <tr key={orderIndex}>
                          <td className="border border-gray-400 p-2 text-xl">{mergedOrder.name}</td>
                          <td className="border border-gray-400 p-2 text-xl">{mergedOrder.quantity}</td>
                          <td className="border border-gray-400 p-2 text-xl">
                            {formatDate(mergedOrder.date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-xl text-black p-2 mx-20">No orders placed by {user.name}.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserDataCardSbsm;