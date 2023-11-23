import {
  Box,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import DisplayPhase from './DisplayPhase';

const ShowAdminPlans = ({ currentPlan }) => {
  const startDate = new Date(currentPlan.startDate);
  const endDate = new Date(currentPlan.endDate);
  const year = startDate.getFullYear();
  const quarter = Math.floor((startDate.getMonth() + 3) / 3); // Quarter 1 = jan to mar

  const formatDate = (d) => {
    const dateString =
      ('0' + d.getDate()).slice(-2) +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      d.getFullYear() +
      ' ' +
      ('0' + d.getHours()).slice(-2) +
      ':' +
      ('0' + d.getMinutes()).slice(-2);

    return dateString;
  };

  return (
    <div>
      <div className='text-3xl font-bold mb-5'>Your Active Budget Plans</div>
      <ChakraProvider>
        <Card className=' max-w-[1200px]'>
          <CardHeader>
            <Heading size='md'>
              Budget Plan For {year} Quarter {quarter}
            </Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Start Date
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {formatDate(startDate)}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  End Date
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {formatDate(endDate)}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Each Phase Duration
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {currentPlan.phaseDuration} Days
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Current Phase
                </Heading>
                <Text pt='2' fontSize='sm'>
                  <DisplayPhase phase={currentPlan.phase} />
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </ChakraProvider>
    </div>
  );
};

export default ShowAdminPlans;
