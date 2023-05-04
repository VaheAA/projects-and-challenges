import { Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button alignSelf="baseline" variant="outline" colorScheme="orange" size="lg" leftIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>Back</Button>
  );
};

export default BackButton;