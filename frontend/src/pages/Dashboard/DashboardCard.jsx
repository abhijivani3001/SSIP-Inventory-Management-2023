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
import DashboardCardTwo from './DashboardCardTwo';
import EmployeeData from './EmployeeData';
import { Link } from 'react-router-dom';

const DashboardCard = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState('inside');
  const btnRef = React.useRef(null);

  return (
    <>
      {/* common */}
      {props.role === 'common' && (
        <>
          <button
            onClick={onOpen}
            ref={btnRef}
            className={`flex h-32 w-60 flex-col items-center justify-center ${props.bg} ${props.hover} rounded-md text-white shadow-xl border-none ease-in-out hover:border-gray-400/80 hover:scale-105 transition duration-500`}
          >
            <div className='flex flex-row items-center justify-center gap-4'>
              {/* svg */}
              {props.icon}
              <span className='font-bold text-4xl text-white'>
                {props.orders?.length}
              </span>
            </div>

            <div className='mt-2 text-xl text-gray-100'>{props.text}</div>
          </button>

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
                  <DashboardCardTwo orders={props.orders} title={props.text} />
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
      )}

      {/* store-manager */}
      {props.role === 'store-manager' && (
        <>
          {props.tag === '1' && (
            <>
              <button
                onClick={onOpen}
                ref={btnRef}
                className={`flex h-32 w-60 flex-col items-center justify-center ${props.bg} ${props.hover} rounded-md text-white shadow-xl border-none ease-in-out hover:border-gray-400/80 hover:scale-105 transition duration-500`}
              >
                <div className='flex flex-row items-center justify-center gap-4'>
                  {/* svg */}
                  {props.icon}
                  <span className='font-bold text-4xl text-white'>
                    {props.tag === '1' ? props?.belowUsers?.length : ''}
                  </span>
                </div>

                <div className='mt-2 text-xl text-gray-100'>{props.text}</div>
              </button>

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
                      {/* <DashboardCardTwo orders={props.orders} title={props.text} /> */}
                      {props.tag === '1' && (
                        <EmployeeData userData={props.belowUsers} />
                      )}
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
          )}

          {props.tag === '2' && (
            <Link
              to='/inventory'
              className={`flex h-32 w-60 flex-col items-center justify-center ${props.bg} ${props.hover} rounded-md text-white shadow-xl border-none ease-in-out hover:border-gray-400/80 hover:scale-105 transition duration-500`}
            >
              <div className='flex flex-row items-center justify-center gap-4'>
                {/* svg */}
                {props.icon}
                <span className='font-bold text-4xl text-white'>
                  {props.tag === '2' ? props?.inventory?.length : ''}
                </span>
              </div>

              <div className='mt-2 text-xl text-gray-100'>{props.text}</div>
            </Link>
          )}
          {props.tag === '3' && (
            <Link
              to='/'
              className={`flex h-32 w-60 flex-col items-center justify-center ${props.bg} ${props.hover} rounded-md text-white shadow-xl border-none ease-in-out hover:border-gray-400/80 hover:scale-105 transition duration-500`}
            >
              <div className='flex flex-row items-center justify-center gap-4'>
                {/* svg */}
                {props.icon}
                <span className='font-bold text-4xl text-white'>
                  {props.tag === '3' ? props?.lowStock?.length : ''}
                </span>
              </div>

              <div className='mt-2 text-xl text-gray-100'>{props.text}</div>
            </Link>
          )}
          {props.tag === '4' && (
            <Link
              to='/store-manager-requested-orders'
              className={`flex h-32 w-60 flex-col items-center justify-center ${props.bg} ${props.hover} rounded-md text-white shadow-xl border-none ease-in-out hover:border-gray-400/80 hover:scale-105 transition duration-500`}
            >
              <div className='flex flex-row items-center justify-center gap-4'>
                {/* svg */}
                {props.icon}
                <span className='font-bold text-4xl text-white'>
                  {props.tag === '4' ? props?.pendingOrders : ''}
                </span>
              </div>

              <div className='mt-2 text-xl text-gray-100'>{props.text}</div>
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default DashboardCard;
