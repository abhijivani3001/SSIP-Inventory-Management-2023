import React, { Component } from 'react';
import Button from '../components/UI/Button';
import axios from 'axios';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectAll: false,
    };
  }

  componentDidMount() {
    // Fetch all orders with a status of "pending" from the API
    axios.get('/api/user/users')
      .then((response) => {
        console.log(response);
        // Filter the orders to get only the ones with status "pending"
        const pendingOrders = response.data.orders.filter(order => order.status === 'pending');
        this.setState({ items: pendingOrders });
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }

  // handleCheckboxChange = (itemId) {
  //   const updatedItems = this.state.items.map((item) => {
  //     if (item.itemId === itemId) {
  //       return { ...item, approved: !item.approved };
  //     }
  //     return item;
  //   });

  //   this.setState({ items: updatedItems });
  // };

  handleSelectAllChange = () => {
    const { items, selectAll } = this.state;
    const updatedItems = items.map((item) => ({
      ...item,
      approved: !selectAll,
    }));

    this.setState({ items: updatedItems, selectAll: !selectAll });
  };

  render() {
    const { items, selectAll } = this.state;

    return (
      <div className='mx-8 mt-4'>
        <div>
          <h1 className='text-6xl font-light'>Order List</h1>
        </div>

        <div className='my-6'>
          <label className='mx-4 mt-2 text-xl'>
            <input
              className='mx-2'
              type='checkbox'
              checked={selectAll}
              onChange={this.handleSelectAllChange}
            />
            Select All
          </label>
          <ul>
            <div className='flex flex-col'>
              {items.map((item) => (
                <li key={item.itemId}>
                  <div className='border-2 m-2 p-2 flex justify-between rounded-xl bg-white'>
                    <label className='my-auto'>
                      <input
                        className='mx-2'
                        type='checkbox'
                        checked={item.approved}
                        onChange={() => this.handleCheckboxChange(item.itemId)}
                      />
                      {item.name}
                    </label>
                    <div className='flex justify-center align-middle mx-5 space-x-4'>
                      <div className='my-auto'>{item.quantity}</div>
                      <Button>Allocate</Button>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

export default OrderList;
