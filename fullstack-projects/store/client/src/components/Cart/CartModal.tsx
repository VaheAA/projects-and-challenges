import { useContext } from 'react';
import { Modal, Box, Typography, Backdrop, Stack, Button } from '@mui/material';
import { CartContext } from '../../context/cart/CartContext';
import { CartContextType } from '../../types/cart';
import CartProductsList from './CartProductsList';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  maxHeight: 700,
  overflowY: 'auto',
  p: 3,
};



const CartModal: React.FC = () => {

  const { open, toggleCart, products, totalPrice, clearCart, deleteFromCart } = useContext(CartContext) as CartContextType;

  return (
    <Box>
      <Modal
        open={open}
        onClose={toggleCart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition

        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>
          <Stack spacing={3}>
            {products.length > 0 ? <CartProductsList /> : <Typography>No products in the cart</Typography>}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography>
                Total cart price: {totalPrice}$
              </Typography>
              <Button onClick={clearCart}>Clear cart</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default CartModal;