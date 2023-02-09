import React, { useState, useContext, useEffect } from 'react';
import { Box, FormControl, InputLabel, OutlinedInput, Slider, Stack, Checkbox, FormControlLabel, Select, SelectChangeEvent, MenuItem, Button, Typography } from '@mui/material';
import { ProductsContext } from '../../context/products/ProductsContext';
import { ProductContextType } from '../../types/product';


function valuetext(value: number) {
  return `${value}$`;
}

const companies = ['ikea', 'liddy', 'caressa', 'marcos'];
const sorts = ['name', 'price'];
const ratings = [1, 2, 3, 4, 5];


function valueLabelFormat(value: number) {
  const unit = '$';

  let scaledValue = value;

  return `${scaledValue} ${unit}`;
}

const ProductsFilter: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number | undefined>();
  const [company, setCompany] = useState<string>('');
  const [rating, setRating] = useState<string | undefined>();
  const [featured, setFeatured] = useState<boolean>(false);
  const [sort, setSort] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);

  const { getProducts, products } = useContext(ProductsContext) as ProductContextType;

  const prices = products.map(product => product.price);
  const maxPrice = Math.max(...prices);


  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    setPriceRange(newValue as number);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onCompanyChange = (e: SelectChangeEvent) => {
    setCompany(e.target.value);
  };

  const onRatingChange = (e: SelectChangeEvent) => {
    setRating(e.target.value);
  };

  const onFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatured(e.target.checked);
  };

  const onSrotChange = (e: SelectChangeEvent<typeof sort>) => {
    const {
      target: { value },
    } = e;
    setSort(typeof value === 'string' ? value.split(',') : value);
  };


  useEffect(() => {
    setDisabled(() => {
      return (
        name !== '' ||
        priceRange !== undefined ||
        company !== '' ||
        rating !== undefined ||
        sort.length > 0
      );
    });
  }, [name, priceRange, company, rating, sort, featured]);



  const onSubmitFilters = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    let query = new URLSearchParams();

    if (name) {
      query.append('name', name);
    }
    if (company) {
      query.append('company', company);
    }
    if (featured) {
      query.append('featured', featured.toString());
    }

    let numericFilters;
    if (priceRange || rating) {
      numericFilters = [
        `price>${priceRange ? priceRange : 0}`,
        `rating>=${rating ? rating : 0}`
      ];
      query.append('numericFilters', numericFilters.toString());
    }

    await getProducts(`http://localhost:3000/api/v1/products?${query}`);

  };

  return <Box component="aside">
    <Box component="form" autoComplete="off" noValidate onSubmit={onSubmitFilters}>
      <Stack spacing={3}>
        <FormControl>
          <InputLabel htmlFor="product-name">Product Name</InputLabel>
          <OutlinedInput size="small" id="product-name" label="Product Name" value={name} onChange={onNameChange} />
        </FormControl>
        <FormControl variant="standard">
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={priceRange}
            onChange={handleChange}
            max={maxPrice}
            valueLabelDisplay="auto"
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            disableSwap
          />
          <Typography variant='body2'>Maximum price: {priceRange ? priceRange : '0'}$</Typography>
        </FormControl>
        <FormControl>
          <FormControlLabel control={<Checkbox checked={featured} onChange={onFeaturedChange} />} label="Featured" />
        </FormControl>
        <FormControl>
          <InputLabel id="company">Brand</InputLabel>
          <Select
            size='small'
            labelId="company"
            id="company"
            label="Company"
            value={company}
            onChange={onCompanyChange}
          >
            {companies.map(company => (
              <MenuItem key={company} value={company} sx={{ textTransform: 'capitalize' }}>{company}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="rating">Rating</InputLabel>
          <Select
            size='small'
            labelId="rating"
            id="rating"
            label="Rating"
            value={rating}
            onChange={onRatingChange}
          >
            {ratings.map(rating => (
              <MenuItem key={rating} value={rating}>{rating}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="companies">Sorting</InputLabel>
          <Select
            size='small'
            labelId="sorting"
            id="companies"
            label="Sorting"
            value={sort}
            multiple
            onChange={onSrotChange}
          >
            {sorts.map(option => (
              <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button disabled={!disabled} type="submit" variant="outlined" size="small">Filter products</Button>
      </Stack>
    </Box>
  </Box>;
};

export default ProductsFilter;
