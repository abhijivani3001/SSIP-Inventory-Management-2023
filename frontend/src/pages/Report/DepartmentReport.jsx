import { useEffect, useState, useRef } from 'react';
import axios from '../../api/AxiosUrl';
import generatePDF from 'react-to-pdf';

const DepartmentReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const targetRef = useRef();

  const getRequiredData = async () => {
    try {
      const res = await axios.post('/api/user/users', { role: 'employee' });
      const users = res.data.users;
      const itemsMap = new Map();
      users.forEach((user) => {
        user.bulkOrders.forEach((bulkOrder) => {
          bulkOrder.orders.forEach((order) => {
            // if (order === 'completed') {
            if (itemsMap.has(order.name)) {
              const itemMapped = itemsMap.get(order.name);
              itemsMap.set(order.name, order.quantity + itemMapped);
            } else {
              itemsMap.set(order.name, order.quantity);
            }
            // }
          });
        });
      });
      let ordersArray = [];
      itemsMap.forEach((quantity, name) => {
        ordersArray.push({ name, quantity });
      });
      setOrders(ordersArray);
      console.log(ordersArray);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getRequiredData();
  }, []);

  return (
    <div>
      <button onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })}>
        Download PDF
      </button>
      <div ref={targetRef}>
        <div className='m-5'>
          {isLoading && (
            <div className='text-xl my-auto text-center '>Loading...</div>
          )}
          {!isLoading && (
            <table className='w-full divide-y text-left text-gray-500'>
              <thead className='text-xl my-2 text-gray-700 uppercase bg-slate-100'>
                <tr className='divide-x'>
                  <th scope='col' className='px-6 py-1 w-32'>
                    Sr. no
                  </th>
                  <th scope='col' className='px-6 py-1'>
                    Product Name
                  </th>
                  <th scope='col' className='px-6 py-1 w-1/5'>
                    Quantity Used
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  return (
                    <tr className='bg-white text-gray-900 text-xl font-normal hover:bg-gray-50 border-b divide-x'>
                      <td className='px-6 py-2'>{index + 1}.</td>
                      <td className='px-6 py-2'>{order.name}</td>
                      <td className='px-6 py-2'>{order.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentReport;
