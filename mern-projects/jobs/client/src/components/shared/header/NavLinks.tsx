import { useContext } from 'react';
import { Box, List, ListItem, Link, Typography, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/user/UserContext';
import { UserContextType } from '../../../models/user';

export default function NavLinks(): JSX.Element {

  const { isLoggedIn, user, logout } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {isLoggedIn && <Typography variant="body1" fontSize="20px" mr={6}>Hello, {user?.name}</Typography>}
      <List sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {!isLoggedIn && (
          <ListItem>
            <Link component={RouterLink} fontSize="20px" to="/auth" sx={{ textDecoration: 'none' }}>Auth</Link>
          </ListItem>
        )}
        {isLoggedIn && (
          <ListItem>
            <Button variant="text" onClick={logoutHandler} sx={{ fontSize: '20px', textTransform: "capitalize" }}>Logout</Button>
          </ListItem>
        )}
        {isLoggedIn && (
          <ListItem>
            <Link component={RouterLink} fontSize="20px" to="/jobs" sx={{ textDecoration: 'none' }}>Dashboard</Link>
          </ListItem>
        )}
      </List>
    </Box>
  );
}