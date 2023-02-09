import { useContext, useEffect } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import Header from './components/Header/Header';
import ProductsFilter from './components/Products/ProductsFilter';
import ProductsList from './components/Products/ProductsList';
import { ProductsProvider, ProductsContext } from './context/products/ProductsContext';
import { ProductContextType } from './types/product';

function App() {


  return (
    <ProductsProvider>
      <CssBaseline />
      <Container fixed maxWidth="lg">
        <Header />
        <Box display="grid" component="main" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 2">
            <ProductsFilter />
          </Box>
          <Box gridColumn="span 10">
            <ProductsList />
          </Box>
        </Box>
      </Container>
    </ProductsProvider>
  );
}

export default App;
