import { Box, Container, Typography, Stack, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavLinks from './NavLinks';


const boxShadow = `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1)`;


export default function MainHeader(): JSX.Element {
  return (
    <Box component="header" py={2} sx={{ boxShadow: boxShadow }}>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Link to="/" component={RouterLink} sx={{ textDecoration: 'none' }}>
            <Typography variant='h4'>
              Jobs
            </Typography>
          </Link>
          <NavLinks />
        </Stack>
      </Container>
    </Box>
  );
}