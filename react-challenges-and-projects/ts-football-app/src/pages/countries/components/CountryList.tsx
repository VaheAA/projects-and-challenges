import CountryCard from './CountryCard';
import { ICountry } from '../../../types/country';
import { SimpleGrid } from '@chakra-ui/react';

type CountryListProps = {
  data: ICountry[] | undefined;
};

const CountryList: React.FC<CountryListProps> = ({ data }) => {


  const renderCountries = data?.map((country, index) => <CountryCard key={country.code + index} name={country.name} flag={country.flag} code={country.code} />);

  return (
    <SimpleGrid columns={5} spacing={10}>
      {renderCountries}
    </SimpleGrid>
  );
};

export default CountryList;