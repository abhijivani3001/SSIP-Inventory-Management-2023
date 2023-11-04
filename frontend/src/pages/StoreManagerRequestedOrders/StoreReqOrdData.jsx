import React, { useState, useEffect, useContext } from "react";
import Inventory from "../Inventory";
import axios from "../../api/AxiosUrl";
import Button from "../../components/UI/Button";
import { ToastContainer, toast } from "react-toastify";

const StoreReqOrdData = (props) => {
  const [inventoryData, setInventoryData] = useState([]);
  const [allocatedOrderData, setAllocatedOrderData] = useState(props.orders);

  const getInventoryItemsQuantity = async () => {
    try {
      const result = await axios.get("api/inventory");
      const data = await result.data.inventory;
      console.log(data);
      setInventoryData(data);
      setAllocatedOrderData((prevOrderData) => {
        console.log(prevOrderData.length, prevOrderData);
        const updatedOrderData = props.orders.map((order) => {
          const inventoryItem = data.find(
            (singleInventoryItem) => singleInventoryItem.itemId === order.itemId
          );
          if (inventoryItem) {
            return {
              ...order,
              quantity: Math.min(
                order.quantity - order.delivered,
                inventoryItem.quantity
              ),
            };
          }
          return { ...order, quantity: 0 };
        });
        console.log(updatedOrderData);
        return updatedOrderData;
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAllocate = async (id, orderId, quantityToBeDelivered) => {
    try {
      // quantity=requirement of user
      if (quantityToBeDelivered <= 0) {
        return toast.success("Allocate Quantity should be > 0", {
          autoClose: 1500,
        });
      }
      let inventoryItemQuantity, tempId; // q=quantity of inventory item, tempId=inventory Id in which we want to update quantity
      inventoryData.map((item) => {
        if (item.itemId === id) {
          inventoryItemQuantity = item.quantity;
          tempId = item._id;
        }
      });
      // console.log(q - quantity);

      const res = await axios.put("api/inventory", {
        updatedQuantity: inventoryItemQuantity - quantityToBeDelivered,
        inventoryId: tempId,
      });

      const res2 = await axios.put(`api/order/${orderId}`, {
        // user_id: userData._id,
        user_id: props.userId,
        status: "accepted",
        delivered: quantityToBeDelivered,
      });
      toast.success("Item allocated Successfully", {
        autoClose: 1500,
      });
      console.log(res2);
      props.getRequiredData();

      // console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInventoryItemsQuantity();
  }, [getInventoryItemsQuantity]);

  const [userData, setUserData] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/user");
        const data = await res.data.user;
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      {props.orders.length > 0 && (
        <div className="bg-gray-200 border-2 border-gray-300 rounded-lg m-4">
          <div className="text-2xl font-semibold mx-4 my-2">{props.name}</div>

          {props.orders.map((order, index) => (
            <div key={order.itemId}>
              {/* {order.status === 'pending' && ( */}
              {(order.status === "accepted" || order.status === "pending") && (
                <div className="border flex justify-between mx-11 p-1 text-lg">
                  <div className="grid grid-cols-5 w-full">
                    <div>{order.name}</div>

                    <div className="border border-black rounded w-20 h-7 text-center my-auto">
                      <span className="text-sm">x</span>
                      {order.quantity - order.delivered}
                    </div>

                    <label className="mx-3 flex justify-end items-center">
                      Allocate Qty:
                      <input
                        type="number"
                        value={allocatedOrderData[index].quantity}
                        onChange={(e) => {
                          setAllocatedOrderData((prevOrderData) => {
                            const updatedOrderData = prevOrderData.map(
                              (item) => {
                                const inventoryItem = inventoryData.find(
                                  (singleInventoryItem) =>
                                    singleInventoryItem.itemId === order.itemId
                                );
                                if (item._id === order._id) {
                                  return {
                                    ...item,
                                    quantity: Math.min(
                                      e.target.value,
                                      Math.min(
                                        order.quantity - order.delivered,
                                        inventoryItem.quantity
                                      )
                                    ),
                                  };
                                }
                                return item;
                              }
                            );
                            return updatedOrderData;
                          });
                        }}
                        min={0}
                        className="border-2 border-gray-700 w-16 p-0 text-center mx-4 rounded"
                      />
                    </label>

                    <div className="flex w-auto">
                      <button
                        onClick={() =>
                          handleAllocate(
                            order.itemId,
                            order._id,
                            allocatedOrderData[index].quantity // store-manager's allocated quantity
                          )
                        }
                        className={`bg-blue-600 hover:bg-blue-800 border-gray-300 border w-20 h-10 rounded text-white hover:text-gray-200 ${
                          (order.quantity - order.delivered !==
                            allocatedOrderData[index].quantity ||
                            allocatedOrderData[index].quantity === 0) &&
                          "disabled:opacity-20 disabled:bg-gray-600 cursor-not-allowed hover:bg-gray-600"
                        }`}
                        disabled={
                          order.quantity - order.delivered !==
                            allocatedOrderData[index].quantity ||
                          allocatedOrderData[index].quantity === 0
                        }
                      >
                        Allocate
                      </button>

                      {/* pending */}
                      {/* <button
                        onClick={handleReject}
                        className="bg-red-600 hover:bg-red-800 border-red-300 border w-20 h-10 rounded text-white hover:text-gray-200 ml-3"
                      >
                        Reject
                      </button> */}
                    </div>

                    <div className="border border-black rounded w-20 h-7 text-center my-auto ml-auto">
                      <span className="text-sm">x</span>
                      {inventoryData.find(
                        (singleInventoryItem) =>
                          singleInventoryItem.itemId === order.itemId
                      )?.quantity || 0}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default StoreReqOrdData;