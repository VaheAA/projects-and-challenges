import { Container, CssBaseline, Box } from '@mui/material';
import Header from './components/Header/Header';
import ProductsFilter from './components/Products/ProductsFilter';
import ProductsList from './components/Products/ProductsList';
import { ProductsProvider } from './context/products/ProductsContext';
import { CartProvider } from './context/cart/CartContext';
import CartModal from './components/Cart/CartModal';

function App() {


  return (
    <CartProvider>
      <ProductsProvider>
        <CssBaseline />
        <Container fixed maxWidth="xl">
          <Header />
          <Box mt={3} mb={3} display="grid" component="main" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 3">
              <ProductsFilter />
            </Box>
            <Box gridColumn="span 9">
              <ProductsList />
            </Box>
          </Box>
        </Container>
        <CartModal />
      </ProductsProvider>
    </CartProvider>
  );
}

export default App;
