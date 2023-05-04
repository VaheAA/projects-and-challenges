import { Box, Typography, Link, Card } from '@mui/material';
import Logo from './Logo';
import Cart from '../Cart/CartButton';

const Header: React.FC = () => {
  return (
    <Box
      component="header"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        height: '72px'
      }}
    >
      <Logo />
      <Cart />
    </Box>
  );
};

export default Header;
