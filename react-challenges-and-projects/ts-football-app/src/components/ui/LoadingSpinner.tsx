import { Spinner, Box } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Box width="100%" height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Spinner colorScheme="orange" size='xl' thickness='4px'
        speed='0.65s' />
    </Box>
  );
};

export default LoadingSpinner;