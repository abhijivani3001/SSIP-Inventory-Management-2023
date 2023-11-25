import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../../api/AxiosUrl';
import ROLES from '../../../constants/ROLES';

const ShowPlannedProducts = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [availableItems, setAvailableItems] = useState(props.quantity);

  const deleteItemHandler = async () => {
    try {
      const res = await axios.delete(`api/planningorder/${props.orderId}`);
      props.getPlannedOrders();

      toast.success('Item added to plan successfully', {
        position: 'top-right',
        autoClose: 1500,
        style: {
          marginTop: '70px',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClick = () => {
    setIsEditing(!isEditing);
    setAvailableItems(props.quantity);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const res = await axios.put('api/planningorder', {
        updatedQuantity: availableItems,
        planningOrderId: props.planningOrderId,
      });
      toast.success('Budget Item updated Successfully', {
        autoClose: 1500,
      });
      props.getPlannedOrders();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <tr
        className={`bg-white text-gray-700 hover:bg-gray-100 border-b divide-x divide-slate-500 text-base`}
      >
        <th className="px-6">{props.index}</th>
        <td
          scope="row"
          className="flex items-center py-1 px-2 whitespace-nowrap"
        >
          <div className="text-base mx-4 font-semibold flex gap-2 ">
            <div>
              <img
                className="p-2 h-16 w-24 object-contain"
                src={props.imageUrl}
                alt="productimage"
              />
            </div>
            <div className="my-auto">{props.name}</div>
          </div>
        </td>

        {props.currentUser.role !== ROLES.EMPLOYEE && (
          <td className="px-6">{props.price}</td>
        )}
        <td className="px-6">
          {isEditing ? (
            <input
              name="quantity"
              type="number"
              className="border-2 border-gray-700 w-12 h-7 p-0 my-auto text-center rounded-lg"
              min={1}
              value={availableItems}
              onChange={(e) => setAvailableItems(Math.max(1, e.target.value))}
            />
          ) : (
            <span>{props.quantity}</span>
          )}
        </td>

        {props.currentUser.role !== ROLES.EMPLOYEE && (
          <>
            <td className="px-6">{props.quantity * props.price}</td>
          </>
        )}
        {!props.isSubmitted && (
          <td className="px-6">
            {isEditing ? (
              <button className="blue_btn" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button className="green_btn" onClick={handleUpdateClick}>
                Update
              </button>
            )}
            <button className="trans_red_btn ml-2" onClick={deleteItemHandler}>
              Delete
            </button>
          </td>
        )}
      </tr>
    </>
  );
};

export default ShowPlannedProducts;
