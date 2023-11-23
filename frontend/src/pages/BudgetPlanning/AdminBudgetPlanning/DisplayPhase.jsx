import {
  Box,
  ChakraProvider,
  Step,
  StepDescription,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import { StepIcon } from '@chakra-ui/react';
import React from 'react';

const DisplayPhase = ({ phase }) => {
  const steps = [
    { title: 'Not Started' }, // { title: 'Not Started', description: 'Contact Info' },
    { title: 'Employee' },
    { title: 'Sub Branch' },
    { title: 'Branch' },
    { title: 'Department' },
    { title: 'Completed' },
  ];

  const phaseIndex = () => {
    let index;
    switch (phase) {
      case 'not-started':
        index = 0;
        break;
      case 'employee':
        index = 1;
        break;
      case 'sub-branch':
        index = 2;
        break;
      case 'branch':
        index = 3;
        break;
      case 'department':
        index = 4;
        break;
      case 'completed':
        index = 6;
        break;
      default:
        return 0;
    }
    return index;
  };

  const { activeStep } = useSteps({
    index: phaseIndex(),
    count: steps.length,
  });

  return (
    <ChakraProvider>
      <Stepper index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </ChakraProvider>
  );
};

export default DisplayPhase;
