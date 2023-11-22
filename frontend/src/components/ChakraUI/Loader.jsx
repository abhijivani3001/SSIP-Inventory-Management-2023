import React from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

const Loader = () => {
  return (
    <div className='text-center'>
      <CircularProgress isIndeterminate color='blue.400' size='40px' />
    </div>
  );
};

export default Loader;
