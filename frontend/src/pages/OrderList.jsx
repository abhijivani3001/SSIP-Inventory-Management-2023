import React, { Component } from 'react';
import Button from '../components/UI/Button';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, name: 'Item 1', approved: false, frequency: 12 },
        { id: 2, name: 'Item 2', approved: false, frequency: 7 },
        { id: 3, name: 'Item 3', approved: false, frequency: 20 },
      ],
      selectAll: false,
    };
  }

  handleCheckboxChange = (itemId) => {
    const updatedItems = this.state.items.map((item) => {
      if (item.id === itemId) {
        return { ...item, approved: !item.approved };
      }
      return item;
    });

    this.setState({ items: updatedItems });
  };

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
        {/* title */}
        <div>
          <h1 className='text-6xl font-light'>Order List</h1>
        </div>
        {/* items */}
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
                <li key={item.id}>
                  <div className='border-2 m-2 p-2 flex  justify-between rounded-xl'>
                    <label className='my-auto'>
                      <input
                        className='mx-2'
                        type='checkbox'
                        checked={item.approved}
                        onChange={() => this.handleCheckboxChange(item.id)}
                      />
                      {item.name}
                    </label>
                    <div className='flex justify-center align-middle mx-5 space-x-4'>
                      <div className='my-auto'>{item.frequency}</div>
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
