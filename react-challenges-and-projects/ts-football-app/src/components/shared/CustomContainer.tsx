import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface CustomContainerProps {
  children: ReactNode;
}

const CustomContainer: React.FC<CustomContainerProps> = ({ children }) => {
  return (
    <Container maxW="1440px" mx="auto">
      {children}
    </Container>
  );
};

export default CustomContainer;