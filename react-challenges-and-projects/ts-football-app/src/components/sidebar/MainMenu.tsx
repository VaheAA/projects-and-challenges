import {
  Menu,
  MenuItem,
  Icon,
  Text
} from '@chakra-ui/react';
import { FcGlobe } from 'react-icons/fc';
import { GiTrophyCup } from 'react-icons/gi';
import { Link } from 'react-router-dom';


interface MainMenuProps {
  onClick: () => void;
}


const MainMenu: React.FC<MainMenuProps> = ({ onClick }) => {
  return (
    <Menu matchWidth>
      <Link onClick={onClick} to="/countries">
        <MenuItem py={5} px={2} fontSize={20} display="flex" alignItems="center" gap={4}>
          <Icon as={FcGlobe} alignSelf="center" />
          <Text>
            Countries
          </Text>
        </MenuItem>
      </Link>
      <Link onClick={onClick} to="/international">
        <MenuItem py={5} px={2} fontSize={20} display="flex" alignItems="center" gap={4}>
          <Icon as={GiTrophyCup} alignSelf="center" />
          <Text>
            International
          </Text>
        </MenuItem>
      </Link>
    </Menu>
  );
};

export default MainMenu;


