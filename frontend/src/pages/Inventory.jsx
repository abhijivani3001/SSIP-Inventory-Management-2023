import React, { useEffect, useState } from 'react';
import InventoryCard from '../components/UI/InventoryCard';

const Inventory = () => {
  return (
    <div className='mx-8 mt-4'>
      <div>
        <h1 className='text-6xl font-light'>Inventory</h1>
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
