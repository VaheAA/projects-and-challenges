import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '../utils/getToken';


const PrivateRoute = () => {

  return getToken() ? <Outlet /> : <Navigate to="/auth" />;

};

export default PrivateRoute;