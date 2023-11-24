import React, { useState } from 'react';
import UserInfo from './UserInfo';

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

import multiavatar from '@multiavatar/multiavatar';
import DangerousHTML from 'react-dangerous-html';

const AllRegisteredUsersTwo = (props) => {
  const userData = props.userData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState('inside');
  const btnRef = React.useRef(null);

  let svgCode = multiavatar(userData.profileIcon || '66493f858b6dc78b85');

  return (
    <>
      <tr className='bg-white text-gray-900 text-base font-normal hover:bg-gray-50 border-b divide-x'>
        <td className='px-6 py-2'>{props.index}.</td>
        <td className='px-6 py-2'>
          <button
            onClick={onOpen}
            ref={btnRef}
            className='font-medium flex justify-center gap-4 text-gray-700 hover:text-blue-500 hover:underline'
          >
            <div className='w-8 shadow-2xl rounded-full'>
              <DangerousHTML html={svgCode} />
            </div>
            <div className='my-auto'>{userData.name}</div>
          </button>
        </td>
        <td className='px-6 py-2'>{userData.email}</td>
        <td className='px-6 py-2'>{userData.subBranch}</td>
        <td className='px-6 py-2'>{userData.branch}</td>
        <td className='px-6 py-2'>{userData.department}</td>
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
