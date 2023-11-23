import React from 'react';
import {
  ChakraProvider,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';

const Loader = () => {
  return (
    <div className='h-full flex py-[42vh] align-middle justify-center'>
      <ChakraProvider>
        <CircularProgress isIndeterminate color='blue.400' size='40px' />
      </ChakraProvider>
    </div>
  );
};

export default Loader;
