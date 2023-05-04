import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import MainHeader from '../components/navigation/MainHeader';
import Sidebar from '../components/sidebar/Sidebar';
import { useAppDispatch } from '../hooks/useTypedSelector';
import { setCredentials } from '../store/reducers/auth/authSlice';
import { useAuth } from '../hooks/useAuth';
import Footer from '../components/shared/Footer';

const MainLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { userData } = useAuth();

  const dispatch = useAppDispatch();
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (userData)
      dispatch(setCredentials(userData));
  }, []);

  return (
    <Flex direction="column" height="100%">
      <MainHeader toggleSidebar={handleOpen} />
      <Box as="main" pt="86px" pb={12} flexGrow={1}>
        <Outlet />
      </Box>
      <Footer />
      <Sidebar isOpen={isOpen} onClose={handleClose} />
    </Flex>
  );
};

export default MainLayout;