import { Link, Card, Heading, IconButton, Image, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { ILeague } from '../../../types/league';
import { useState } from 'react';

const LeagueCard: React.FC<ILeague> = ({ id, name, type, logo }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);


  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Card overflow='hidden'
      variant='outline'
      direction='row'
      justifyContent="space-between"
      alignItems="center"
      p={5}
      transition="ease 0.3s"
      _hover={{ boxShadow: ' rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px; ' }}
    >
      <Link as={RouterLink} to={`/leagues/${id}`} width="100%" _hover={{ textDecoration: "none" }}>
        <Stack direction="row" alignItems="center" gap={3}>
          <Image src={logo} boxSize="75px" />
          <Heading fontSize={22}>{name}</Heading>
        </Stack>
      </Link>
      <IconButton size="lg" icon={<StarIcon />} aria-label="Add to favorites" colorScheme="orange" variant={isFavorite ? 'solid' : 'outline'} onClick={toggleFavorite} />
    </Card>
  );
};

export default LeagueCard;