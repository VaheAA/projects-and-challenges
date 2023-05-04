import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface AuthContainierProps {
  children: ReactNode;
}

const AuthContainier: React.FC<AuthContainierProps> = ({ children }) => {
  return (
    <Container maxW="550px" mx="auto" mt={20}>
      {children}
    </Container>
  );
};

export default AuthContainier;