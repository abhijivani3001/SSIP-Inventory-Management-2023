import React from 'react';
import {
  ChakraProvider,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';

const Loader = () => {
  return (
    <div className='h-full w-full flex py-[40vh] align-middle justify-center overflow-y-hidden'>
      <ChakraProvider>
        <CircularProgress isIndeterminate color='blue.400' size='40px' />
      </ChakraProvider>
    </div>
  );
};

export default Loader;
