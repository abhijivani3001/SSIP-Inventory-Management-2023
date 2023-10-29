import React from 'react';
import InventoryCard from '../components/UI/InventoryCard';

const Inventory = () => {
  return (
    <div>
      <div>
        <h1 className='text-6xl m-3 font-light'>Inventory</h1>
      </div>
      <div className='flex flex-wrap justify-center my-6'>
        <InventoryCard />
        <InventoryCard />
        <InventoryCard />
        <InventoryCard />
        <InventoryCard />
      </div>
    </div>
  );
};

export default Inventory;
