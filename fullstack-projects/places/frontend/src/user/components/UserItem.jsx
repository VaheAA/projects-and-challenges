import Avatar from '../../shared/components/UI/Avatar';
import { NavLink } from 'react-router-dom';
import './UserItem.css';
import Card from '../../shared/components/UI/Card';

const UserItem = ({ id, name, image, placeCount }) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <NavLink to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar
              alt={name}
              image={`${import.meta.env.VITE_APP_ASSET_URL}/${image}`}
            />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </NavLink>
      </Card>
    </li>
  );
};

export default UserItem;
