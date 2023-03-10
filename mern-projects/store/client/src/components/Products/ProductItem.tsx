import { useContext } from 'react';
import { Stack, Typography, Chip, Button, Card, CardMedia } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { IProduct } from '../../types/product';
import { CartContext } from '../../context/cart/CartContext';
import { CartContextType } from '../../types/cart';

type ProductItemProps = {
  product: IProduct;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { addToCart } = useContext(CartContext) as CartContextType;

  return (
    <Card variant="outlined" >
      <Stack sx={{ position: 'relative' }}>
        <CardMedia image="https://picsum.photos/200/300" title={product.name} sx={{ display: 'block', height: '250px', objectFit: 'cover' }} />
        {product.featured &&
          <Chip label="Featured" color="warning" sx={{ position: 'absolute', top: '10px', left: '10px' }} />
        }
        <Stack px={1} pb={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
            <Typography variant="h6" textTransform="capitalize">
              {product.name}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {product.rating}
              <StarIcon color="warning" />
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1} mb={2}>
            <Typography variant="body1">
              {product.price}$
            </Typography>
            <Chip label={product.company} color="primary" sx={{ textTransform: "capitalize" }} />
          </Stack>
          <Button size="small" variant="contained" onClick={() => addToCart(product)}>Add to cart</Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProductItem;