import React from 'react';
import { createPortal } from 'react-dom';
import AddPlannedProductTwo from './AddPlannedProductTwo';

const Backdrop = (props) => {
  return <div className='backdrop' onClick={props.onClick} />;
};

const AddPlannedProduct = (props) => {
  const portalElement = document.getElementById('overlays');

  return (
    <>
      {createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
      {createPortal(
        <div className='modal'>
          <AddPlannedProductTwo
            onClose={props.onClose}
            getPlannedOrders={props.getPlannedOrders}
          />
        </div>,
        portalElement
      )}
    </>
  );
};

export default AddPlannedProduct;
