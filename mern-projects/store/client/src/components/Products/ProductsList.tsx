import { useEffect, useContext, useState } from 'react';
import { ProductsContext } from '../../context/products/ProductsContext';
import { ProductContextType } from '../../types/product';
import ProductItem from './ProductItem';
import { Grid, Box, Pagination, Stack } from '@mui/material';
import LoadingSpinner from '../UI/LoadingSpinner';


const ProductsList: React.FC = () => {
  const [page, setPage] = useState(1);

  const { getProducts, products, loading, numOfPages } = useContext(ProductsContext) as ProductContextType;

  useEffect(() => {
    const sendRequest = async () => {
      await getProducts(`http://localhost:3000/api/v1/products?page=${page}`);
    };
    sendRequest();
  }, [page]);


  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return <Box >
    {loading && <LoadingSpinner />}
    {!loading && <Grid container mb={2} spacing={2}>
      {products.map(product => (
        <Grid key={product._id} item xs={4}>
          <ProductItem product={product} />
        </Grid>
      ))}
    </Grid>}
    <Stack direction="row" justifyContent="center">
      <Pagination color="primary" count={numOfPages} page={page} onChange={onPageChange} />
    </Stack>
  </Box>;
};

export default ProductsList;
