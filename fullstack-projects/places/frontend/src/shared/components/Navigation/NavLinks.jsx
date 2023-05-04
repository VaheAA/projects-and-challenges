import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Button from '../FormElements/Button';
import './NavLinks.css';

const NavLinks = ({}) => {
  const { isLoggedIn, userId, logout } = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">All Users</NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/places`}>My Places</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Place</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Button inverse onClick={logout}>
            Logout
          </Button>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
