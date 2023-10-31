import React from 'react';
import { createPortal } from 'react-dom';

import AddInventoryItemsContent from './AddInventoryItemsContent';

const Backdrop = (props) => {
  return <div className='backdrop' onClick={props.onClick} />;
};

const AddInventoryItem = (props) => {
  const portalElement = document.getElementById('overlays');

  return (
    <>
      {createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
      {createPortal(
        <div className='modal'>
          <AddInventoryItemsContent onClose={props.onClose} />
        </div>,
        portalElement
      )}
    </>
  );
};

export default AddInventoryItem;
