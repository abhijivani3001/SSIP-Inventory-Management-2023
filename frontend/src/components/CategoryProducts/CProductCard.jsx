import {
  Box,
  Card,
  CardBody,
  CardFooter,
  ChakraProvider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

const CProductCard = ({ items }) => {
  console.log(items);
  return (
    <div className=" cursor-pointer shadow-lg rounded">
      <ChakraProvider>
        <Card
          direction={{ base: 'row' }}
          className="h-64 justify-between"
          overflow="hidden"
          variant="outline"
        >
          <Stack>
            <CardBody>
              <Heading size="md">Stationary Items</Heading>

              <Text py="1">Stapler</Text>
              <Text py="1">Sharpener</Text>
              <Text py="1">Erase</Text>
              <Text py="1">A4 Sheets</Text>
              <Text py="1">Pens</Text>
            </CardBody>
          </Stack>
          <Image
            maxW={{ base: '200px' }} // maxW={{ base: '100%', sm: '200px' }}
            className=" object-contain p-5"
            // src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            src="https://m.media-amazon.com/images/I/81VadRn+t-L._AC_UL480_FMwebp_QL65_.jpg"
            alt="Caffe Latte"
          />
        </Card>
      </ChakraProvider>
    </div>
  );
};

export default CProductCard;
