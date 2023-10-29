import React from 'react';
import InventoryCard from '../components/UI/InventoryCard';

const Inventory = () => {
  return (
    <div>
      <div>Inventory</div>
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
