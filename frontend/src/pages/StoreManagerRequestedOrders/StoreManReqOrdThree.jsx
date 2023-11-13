import React, { useEffect, useState } from "react";
import axios from "../../api/AxiosUrl";
import { toast } from "react-toastify";

const StoreManReqOrdThree = (props) => {
  const [inventoryData, setInventoryData] = useState([]);
  const [allocationQuantity, setAllocationQuantity] = useState(0);

  const getInventoryItemsQuantity = async () => {
    try {
      const result = await axios.get("api/inventory");
      const data = await result.data.inventory;
      setInventoryData(data);
      const currentOrderInventoryQuantity =
        data?.find(
          (singleInventoryItem) => singleInventoryItem.itemId === props.itemId
        )?.quantity || 0;
      setAllocationQuantity(
        Math.min(
          currentOrderInventoryQuantity,
          props.quantity - props.delivered
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAllocationQuantity = (e) => {
    const currentOrderInventoryQuantity =
      inventoryData?.find(
        (singleInventoryItem) => singleInventoryItem.itemId === props.itemId
      )?.quantity || 0;
    const allocationQuantityUpperBound = Math.min(
      currentOrderInventoryQuantity,
      props.quantity - props.delivered
    );
    setAllocationQuantity(
      Math.min(Math.max(e.target.value, 0), allocationQuantityUpperBound)
    );
  };

  const submitAllocation = async (status) => {
    try {
      if (status === "rejected") {
        const res2 = await axios.put(
          `api/order/${props.bulkOrderId}/${props.orderId}`,
          {
            user_id: props.userId,
            status: "rejected",
          }
        );
        toast.success("Order Rejected Successfully", {
          autoClose: 1500,
        });
        return;
      }
      let inventoryItemQuantity, inventoryId;
      inventoryData.forEach((item) => {
        if (item.itemId === props.itemId) {
          inventoryItemQuantity = item.quantity;
          inventoryId = item._id;
        }
      });

      if (inventoryItemQuantity - allocationQuantity < 10) {
        const password = window.prompt("Enter Password");
        const MASTER_PASSWORD = 12345;

        if (password !== MASTER_PASSWORD) {
          toast.error("Incorrect password. Order not allocated.", {
            autoClose: 1500,
          });
          return;
        }
      }

      const res = await axios.put("api/inventory", {
        updatedQuantity: inventoryItemQuantity - allocationQuantity,
        inventoryId,
      });

      let orderOptions = {
        user_id: props.userId,
        delivered: allocationQuantity,
      };
      if (props.quantity === props.delivered + allocationQuantity) {
        orderOptions = { ...orderOptions, status: "accepted" };
      }
      const res2 = await axios.put(
        `api/order/${props.bulkOrderId}/${props.orderId}`,
        {
          ...orderOptions,
        }
      );
      toast.success("Item allocated Successfully", {
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInventoryItemsQuantity();
  }, []);

  return (
    <>
      <tr class="bg-white border-b divide-x dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          class="flex items-center px-4 py-1 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div class="text-base font-semibold flex gap-2">
            <div>
              <img
                className="p-2 h-16 w-24 object-contain"
                src={props.imageUrl}
                alt="productimage"
              />
            </div>
            <div className="my-auto">{props.name}</div>
          </div>
        </th>

        <td class="px-6">{props.quantity}</td>

        <td class="px-6">{props.delivered}</td>

        <td class="px-6">
          {inventoryData?.find(
            (singleInventoryItem) => singleInventoryItem.itemId === props.itemId
          )?.quantity || 0}
        </td>

        <td class="px-6 w-80">
          <div className="flex justify-between">
            <input
              type="number"
              value={allocationQuantity}
              onChange={handleAllocationQuantity}
              className="border-2 border-gray-700 w-16 p-0 text-right rounded"
            />
            <button
              className="blue_btn"
              onClick={() => submitAllocation("accepted")}
            >
              Allocate
            </button>
            <button
              className="trans_red_btn"
              onClick={() => submitAllocation("rejected")}
            >
              Reject
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default StoreManReqOrdThree;
