import React, { useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ChakraProvider,
} from '@chakra-ui/react';
import UserInfo from './UserInfo';

const AllRegisteredUsersTwo = (props) => {
  const userData = props.userData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState('inside');
  const btnRef = React.useRef(null);

  return (
    <>
      <tr className='bg-white text-gray-900 text-base font-normal hover:bg-gray-50 border-b divide-x'>
        <td className='px-6'>{props.index}.</td>
        <td className='px-6'>
          <button
            onClick={onOpen}
            ref={btnRef}
            className='font-medium text-gray-700 hover:text-blue-500 hover:underline'
          >
            {userData.name}
          </button>
          {/* <ChakraProvider>
            <Button ref={btnRef} onClick={onOpen}>
              Open Modal
            </Button>
          </ChakraProvider> */}
        </td>
        <td className='px-6'>{userData.email}</td>
        <td className='px-6'>{userData.subBranch}</td>
        <td className='px-6'>{userData.branch}</td>
        <td className='px-6'>{userData.department}</td>
      </tr>

      <ChakraProvider>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={'full'}
          // blockScrollOnMount={false}
          scrollBehavior={scrollBehavior}
          finalFocusRef={btnRef}
        >
          <ModalOverlay />
          <ModalContent
            width='86vw'
            maxHeight='94vh'
            minHeight='90vh'
            margin='auto'
            rounded='xl'
          >
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UserInfo userData={userData} />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </>
  );
};

export default AllRegisteredUsersTwo;
