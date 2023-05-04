import { useContext } from 'react';
import { Badge, BadgeProps, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../../context/cart/CartContext';
import { CartContextType } from '../../types/cart';


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


const Cart: React.FC = () => {

  const { products, toggleCart } = useContext(CartContext) as CartContextType;

  return (
    <IconButton aria-label="cart" onClick={toggleCart}>
      <StyledBadge badgeContent={products.length} color="warning">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
};

export default Cart;
