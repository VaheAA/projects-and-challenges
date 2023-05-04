import { Box, Image, Grid, GridItem, Text, Heading, Button, Stack, Link } from '@chakra-ui/react';
import CustomContainer from '../../components/shared/CustomContainer';
import MainBanner from '../../components/shared/MainBanner';
import clImage from '../../assets/cl.jpg';
import uelImage from '../../assets/uel.jpg';
import ueclImage from '../../assets/uelc.jpg';
import uefascImage from '../../assets/uefasc.jpg';
import { Link as RouterLink } from 'react-router-dom';


const Home: React.FC = () => {
  return (
    <Box>
      <MainBanner title="Welcome to Foozball!" subtitle="Start your adventure in the world of football now!" button="Explore countries" href="/countries" />
      <CustomContainer>
        <Stack pt={4} direction="column" height="100%">
          <Heading as="h2" my={4} textAlign="center">Explore FoozBall!</Heading>
          <Grid
            templateColumns='repeat(6, 1fr)'
            gap={4}
          >
            <GridItem colSpan={6} bg="blackAlpha.300" height="400px" borderRadius="10px" transition="all 0.3s ease" _hover={{ bg: 'blackAlpha.500' }}>
              <Link as={RouterLink} height="100%" to='/international' position="relative" display="block">
                <Image src={clImage} height="100%" width="100%" objectFit="cover" position="relative" zIndex="-1" borderRadius="10px" />
                <Text position="absolute" bottom="170px" left="30px" fontSize="36px" color="white" fontWeight="600">UEFA Champions League</Text>
              </Link>
            </GridItem>
            <GridItem colSpan={2} bg="blackAlpha.500" height="200px" borderRadius="10px" transition="all 0.3s ease" _hover={{ bg: 'blackAlpha.700' }}>
              <Link as={RouterLink} height="100%" to='/international' position="relative" display="block">
                <Image src={uelImage} height="100%" width="100%" objectFit="cover" position="relative" zIndex="-1" borderRadius="10px" />
                <Text position="absolute" bottom="70px" left="10px" fontSize="20px" color="white" fontWeight="600">UEFA Europa League</Text>
              </Link>
            </GridItem>
            <GridItem colSpan={2} bg="blackAlpha.500" height="200px" borderRadius="10px" transition="all 0.3s ease" _hover={{ bg: 'blackAlpha.700' }}>
              <Link as={RouterLink} height="100%" to='/international' position="relative" display="block">
                <Image src={ueclImage} height="100%" width="100%" objectFit="cover" position="relative" zIndex="-1" borderRadius="10px" />
                <Text position="absolute" bottom="70px" left="10px" fontSize="20px" color="white" fontWeight="600">UEFA Europa Conference League</Text>
              </Link>
            </GridItem>
            <GridItem colSpan={2} bg="blackAlpha.500" height="200px" borderRadius="10px" transition="all 0.3s ease" _hover={{ bg: 'blackAlpha.700' }}>
              <Link as={RouterLink} height="100%" to='/international' position="relative" display="block">
                <Image src={uefascImage} height="100%" width="100%" objectFit="cover" position="relative" zIndex="-1" borderRadius="10px" />
                <Text position="absolute" bottom="70px" left="10px" fontSize="20px" color="white" fontWeight="600">UEFA Super Cup</Text>
              </Link>
            </GridItem>
          </Grid>
        </Stack>
      </CustomContainer>
    </Box >
  );
};

export default Home;