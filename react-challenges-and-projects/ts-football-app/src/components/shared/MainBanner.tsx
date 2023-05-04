import { Box, Text, Heading, Button, Stack, Container } from '@chakra-ui/react';
import bannerImage from '../../assets/banner.jpg';
import { Link as RouterLink } from 'react-router-dom';


interface MainBannerProps {
  title: string;
  subtitle: string;
  button: string;
  href: string;
}



const MainBanner: React.FC<MainBannerProps> = ({ title, subtitle, href, button }) => {
  return (
    <Box position="relative" height="650px" width="100%" backgroundImage={bannerImage} backgroundSize="cover" backgroundPosition="center" display="flex" justifyContent="center" alignItems="center">
      <Container maxW="650px" mx="auto">
        <Stack px={4} py={6} spacing={6} direction="column" rounded="md" backgroundColor="whiteAlpha.800" textAlign="center">
          <Box display="flex" flexDirection="column" gap={6}>
            <Heading as="h1" fontSize={48} color="gray.600">{title}</Heading>
            <Text fontSize={24} color="gray.600">{subtitle}</Text>
          </Box>
          <RouterLink to={href}>
            <Button fontSize={20} colorScheme="orange" alignSelf="baseline" size="lg">
              {button}
            </Button>
          </RouterLink>
        </Stack>
      </Container>
    </Box>
  );
};

export default MainBanner;