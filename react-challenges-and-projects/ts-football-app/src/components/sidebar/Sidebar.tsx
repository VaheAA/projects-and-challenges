import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import MainMenu from './MainMenu';


interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontSize={24}>FoozBall Menu</DrawerHeader>
        <DrawerBody>
          <MainMenu onClick={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;