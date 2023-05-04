import { Box, Text, Stack, Link } from '@chakra-ui/react';
import CustomContainer from './CustomContainer';

const Footer = () => {
  return (
    <Box as="footer" backgroundColor="gray.300" py={10}>
      <CustomContainer>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={2} fontSize={20}>
            <Text>
              Created by
            </Text>
            <Link isExternal href="https://github.com/VaheAA">Vahe Abovyan</Link>
          </Stack>
          <Text fontSize={20}>&copy; FoozBall. 2023</Text>
        </Stack>
      </CustomContainer>
    </Box>
  );
};

export default Footer;