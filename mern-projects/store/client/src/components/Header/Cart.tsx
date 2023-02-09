import { Box, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" sx={{ position: 'relative' }}>
      <Button>
        <ShoppingCartIcon />
      </Button>
      <Typography
        sx={{ position: 'absolute', right: '15px', top: '-5px', color: 'red' }}
      >
        0
      </Typography>
    </Box>
  );
};

export default Cart;
