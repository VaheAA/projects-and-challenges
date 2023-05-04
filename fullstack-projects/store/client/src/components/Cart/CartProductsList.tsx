import { useContext } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material';
import { CartContext } from '../../context/cart/CartContext';
import { CartContextType } from '../../types/cart';
import { DeleteOutlined } from '@mui/icons-material';

const CartProductsList: React.FC = () => {
  const { products, deleteFromCart } = useContext(CartContext) as CartContextType;

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {products.map(product => (
        <ListItem key={product._id}>
          <ListItemAvatar>
            <Avatar src="https://picsum.photos/200/300" alt={product.name} />
          </ListItemAvatar>
          <ListItemText primary={product.name} secondary={`${product.price}$`} sx={{ textTransform: "capitalize" }} />
          <IconButton onClick={() => deleteFromCart(product._id)} >
            <DeleteOutlined />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default CartProductsList;