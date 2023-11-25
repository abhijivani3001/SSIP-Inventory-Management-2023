import { useEffect, useState, useRef } from 'react';
import axios from '../../api/AxiosUrl';
import generatePDF from 'react-to-pdf';
import Loader from '../../components/ChakraUI/Loader';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';

const DepartmentReport = () => {
  const formatDate = (dt) => {
    const d = new Date(dt);
    const dateString =
      ('0' + d.getDate()).slice(-2) +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      d.getFullYear();

    return dateString;
  };

  const getTodayDate = () => {
    const d = new Date();
    const dateString =
      d.getFullYear() +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + d.getDate()).slice(-2);

    return dateString;
  };

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [usedItems, setUsedItems] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [startDate, setStartDate] = useState(
    getTodayDate().slice(0, 4) + '-01-01'
  );
  const [endDate, setEndDate] = useState(getTodayDate());
  const [user, selectedUser] = useState({});
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
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUser = async () => {
    try {
      console.log(selectedRole, selectedBranch);
      const res = await axios.post('/api/user/users', {
        role: selectedRole,
        branch: selectedBranch,
        department: 'GAD',
      });
      if (res.data.users.length === 0) {
        return;
      }
      const currentUser = res.data.users[0];
      selectedUser(res.data.users[0]);
      console.log(currentUser);
      const itemsMap = new Map();
      currentUser.bulkOrders.forEach((bulkOrder) => {
        const date = new Date(bulkOrder.createdAt);
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23);
        if (
          date.getTime() >= start.getTime() &&
          date.getTime() <= end.getTime()
        ) {
          console.log(bulkOrder);
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
        }
      });

      console.log(itemsMap);

      let ordersArray = [];
      itemsMap.forEach((quantity, name) => {
        ordersArray.push({ name, quantity });
      });

      setUsedItems(ordersArray);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    // getRequiredData();
    getUser();
  }, [selectedBranch, selectedRole, startDate, endDate]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          <div className="bg-gray-50 py-4 px-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <label htmlFor="roleSelect" className="mr-2 text-lg">
                  Select Role:
                </label>
                <select
                  id="roleSelect"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  className="p-2 border rounded-lg bg-white shadow-md"
                >
                  <option>Select Role</option>
                  <option value="branch-store-manager">Branch</option>
                  {/* <option value="employee">Employee</option> */}
                </select>
              </div>
              <div className="flex items-center">
                <label htmlFor="roleSelect" className="mr-2 text-lg">
                  Select Branch:
                </label>
                <select
                  id="branchSelect"
                  value={selectedBranch}
                  onChange={(e) => {
                    console.log('hi');
                    setSelectedBranch(e.target.value);
                  }}
                  className="p-2 border rounded-lg bg-white shadow-md"
                >
                  <option>Select Branch</option>
                  <option value="LD">LD</option>
                  <option value="NIRMA">NIRMA</option>
                  <option value="VGEC">VGEC</option>
                  <option value="PDEU">PDEU</option>
                  {/* <option value="employee">Employee</option> */}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-800 cursor-pointer">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="w-full px-3 py-2 border text-black cursor-pointer rounded-lg focus:outline-none focus:border-blue-500"
                  value={startDate}
                  onChange={(e) => {
                    const start = new Date(e.target.value);
                    const end = new Date(endDate);
                    const todayDt = new Date();
                    // if (
                    //   start.getTime() > todayDt.getTime() ||
                    //   (endDate ? start.getTime() > end.getTime() : false)
                    // )
                    //   return;
                    setStartDate(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-800 cursor-pointer">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="w-full px-3 py-2 border text-black cursor-pointer rounded-lg focus:outline-none focus:border-blue-500"
                  value={endDate}
                  onChange={(e) => {
                    const start = new Date(e.target.value);
                    const end = new Date(endDate);
                    const todayDt = new Date();
                    // if (
                    //   end.getTime() > todayDt.getTime() ||
                    //   (startDate ? end.getTime() < start.getTime() : false)
                    // )
                    //   return;
                    setEndDate(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            {selectedRole && selectedBranch && (
              <div>
                <ChakraProvider>
                  <Button
                    colorScheme="blue"
                    onClick={() =>
                      generatePDF(targetRef, { filename: 'page.pdf' })
                    }
                    className="mb-10"
                    mr={3}
                  >
                    DOWNLOAD PDF
                  </Button>
                </ChakraProvider>

                <div ref={targetRef}>
                  <div className=" mb-12">
                    <ChakraProvider>
                      <Card className="">
                        <CardHeader>
                          <Heading size="md">ACCOUNT DETAILS</Heading>
                        </CardHeader>

                        <CardBody>
                          <Stack divider={<StackDivider />} spacing="4">
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Account Email
                              </Heading>
                              <Text pt="2" fontSize="sm">
                                {user.email.toLowerCase()}
                              </Text>
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Branch
                              </Heading>
                              <Text pt="2" fontSize="sm">
                                {user.branch.toUpperCase()}
                              </Text>
                            </Box>
                            {startDate && (
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Start Date
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {formatDate(startDate)}
                                </Text>
                              </Box>
                            )}
                            {endDate && (
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  End Date
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {formatDate(endDate)}
                                </Text>
                              </Box>
                            )}
                          </Stack>
                        </CardBody>
                      </Card>
                    </ChakraProvider>
                  </div>

                  <div className="m-5">
                    {usedItems.length > 0 ? (
                      <div>
                        <div className="text-3xl font-bold mb-5">
                          ITEMS ORDERED
                        </div>
                        <table className="w-full divide-y text-left text-gray-500">
                          <thead className="text-xl my-2 text-gray-700 uppercase bg-slate-100">
                            <tr className="divide-x">
                              <th scope="col" className="px-6 py-1 w-32">
                                Sr. no
                              </th>
                              <th scope="col" className="px-6 py-1">
                                Product Name
                              </th>
                              <th scope="col" className="px-6 py-1 w-1/5">
                                Quantity Used
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {usedItems.map((order, index) => {
                              return (
                                <tr className="bg-white text-gray-900 text-xl font-normal hover:bg-gray-50 border-b divide-x">
                                  <td className="px-6 py-2">{index + 1}.</td>
                                  <td className="px-6 py-2">{order.name}</td>
                                  <td className="px-6 py-2">
                                    {order.quantity}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold mb-5">
                        No Items Received between this date
                      </div>
                    )}
                  </div>

                  <div className="m-5 mt-10">
                    <div className="text-3xl font-bold mb-5">
                      CURRENT INVENTORY ITEMS
                    </div>
                    <table className="w-full divide-y text-left text-gray-500">
                      <thead className="text-xl my-2 text-gray-700 uppercase bg-slate-100">
                        <tr className="divide-x">
                          <th scope="col" className="px-6 py-1 w-32">
                            Sr. no
                          </th>
                          <th scope="col" className="px-6 py-1">
                            Product Name
                          </th>
                          <th scope="col" className="px-6 py-1 w-1/5">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.inventory.map((order, index) => {
                          return (
                            <tr className="bg-white text-gray-900 text-xl font-normal hover:bg-gray-50 border-b divide-x">
                              <td className="px-6 py-2">{index + 1}.</td>
                              <td className="px-6 py-2">{order.name}</td>
                              <td className="px-6 py-2">{order.quantity}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentReport;
