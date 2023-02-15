import { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from '../header/MainHeader';
import { Box, CssBaseline, Container } from '@mui/material';
import { UserContext } from '../../../context/user/UserContext';
import { UserContextType } from '../../../models/user';
import { getToken } from '../../../utils/getToken';

export default function RootLayout(): JSX.Element {

  const { keepLogin, logout } = useContext(UserContext) as UserContextType;

  useEffect(() => {

    const userData = getToken();
    if (userData) {
      keepLogin(userData);
    } else {
      logout;
    }

  }, []);

  return (
    <>
      <CssBaseline />
      <MainHeader />
      <Box component="main" py={6}>
        <Container>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}