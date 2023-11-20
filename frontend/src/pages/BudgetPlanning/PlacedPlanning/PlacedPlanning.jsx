import React, { useEffect, useState } from 'react';
import axios from '../../../api/AxiosUrl';
import AddPlannedProduct from './AddPlannedProduct';
import ShowPlannedProducts from './ShowPlannedProducts';

const PlacedPlanning = (props) => {
  const [plannedBulkOrders, setPlannedBulkOrders] = useState([]); // whole bulk array, which contains status
  const [isPlannedProductsAvailable, setIsPlannedProductsAvailable] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddProductsShown, setIsAddProductsShown] = useState(false);
  const [index, setIndex] = useState(1);

  const showProductsToAdd = () => {
    setIsAddProductsShown(true);
  };
  const hideProductsToAdd = () => {
    setIsAddProductsShown(false);
  };

  const getPlannedOrders = async () => {
    try {
      const res = await axios.get('api/planningorder');
      const data = await res.data.planningBulkOrders;
      setPlannedBulkOrders(data);
      console.log(res);
      if (data?.planningOrders?.length) {
        setIsPlannedProductsAvailable(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPlannedOrders();
  }, []);

  return (
    <div className='mx-10 my-4'>
      {isLoading && (
        <div className='text-xl my-auto text-center '>Loading...</div>
      )}

      {!isLoading && (
        <>
          {/* products empty */}
          {!isPlannedProductsAvailable && (
            <div className='not_available'>Your Planned Products is empty</div>
          )}

          {/* Show planned products */}
          {isPlannedProductsAvailable && (
            <div className='relative overflow-x-auto shadow-lg border border-slate-600'>
              <table className='w-full divide-y divide-slate-500 text-sm text-left text-gray-500'>
                <thead className='text-sm text-gray-700 uppercase bg-slate-200'>
                  <tr className='divide-x divide-slate-500'>
                    <th scope='col' className='px-6 py-3'>
                      Sr. no
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Name
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Price
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Quantity
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Total Price
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Details
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {plannedBulkOrders.planningOrders.map((order, arrayIndex) => {
                    const currentIndex = index + arrayIndex;
                    return (
                      <ShowPlannedProducts
                        key={order.itemId}
                        imageUrl={order.imageUrl}
                        name={order.name}
                        quantity={order.quantity}
                        category={order.category}
                        company={order.company}
                        description={order.description}
                        itemId={order.itemId}
                        orderId={order._id}
                        index={currentIndex}
                        getPlannedOrders={getPlannedOrders}
                        // userId={props.userId}
                        // currentStatus={props.currentStatus}
                        // getRequiredUserData={props.getRequiredUserData}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Add products */}
          <div className='my-6 flex gap-2 justify-center'>
            <button className='blue_btn' onClick={showProductsToAdd}>
              Add Item
            </button>
            {isPlannedProductsAvailable && (
              <button className='green_btn'>Submit</button>
            )}
          </div>

          {isAddProductsShown && (
            <AddPlannedProduct
              getPlannedOrders={getPlannedOrders}
              onClose={hideProductsToAdd}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PlacedPlanning;
