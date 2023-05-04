import { useFetchLeaguesQuery } from '../../services/leagueApi/leagueService';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Box, Heading, Image, Stack } from '@chakra-ui/react';
import LeagueList from './components/LeagueList';
import CustomContainer from '../../components/shared/CustomContainer';
import BackButton from '../../components/ui/BackButton';

const Leagues: React.FC = () => {
  const { code } = useParams();
  const { data, isLoading } = useFetchLeaguesQuery(code);


  if (isLoading) return <LoadingSpinner />;


  return (
    <CustomContainer>
      <Box display="flex" flexDirection="column" gap={12} pt={20}>
        <Stack direction="column" >
          <BackButton />
          <Box display="flex" alignItems="center" justifyContent="center" gap={10}>
            <Image boxSize="120px" src={data![0].country.flag} />
            <Heading>Football Leagues of {data![0].country.name}</Heading>
          </Box>
        </Stack>
        <LeagueList data={data} />
      </Box>
    </CustomContainer>
  );
};

export default Leagues;