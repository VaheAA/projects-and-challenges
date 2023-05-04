import { Card, Heading, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ICountry } from '../../../types/country';

const CountryCard: React.FC<ICountry> = ({ name, code, flag }) => {
  return (
    <Link to={`/countries/${code}`}>
      <Card overflow='hidden'
        variant='outline'
        direction='column' p={2}
        transition="ease 0.3s"
        _hover={{ boxShadow: ' rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px; ' }}
      >
        <Heading fontSize={20} mb={4}>{name}</Heading>
        <Image src={flag} />
      </Card>
    </Link>
  );
};

export default CountryCard;