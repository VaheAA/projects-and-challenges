import { Stack } from '@chakra-ui/react';
import { ILeagueResponse } from '../../../types/league';
import LeagueCard from './LeagueCard';


type LeagueListProps = {
  data: ILeagueResponse[] | undefined;
};


const LeagueList: React.FC<LeagueListProps> = ({ data }) => {

  const filteredLeagues = data?.filter((item, index) => item.league.type === 'League');

  const renderLeagues = filteredLeagues?.map((item, index) => <LeagueCard type={item.league.type} key={item.league.id} name={item.league.name} logo={item.league.logo} id={item.league.id} />);


  return (
    <Stack direction="column" spacing={10}>
      {renderLeagues}
    </Stack>
  );
};

export default LeagueList;