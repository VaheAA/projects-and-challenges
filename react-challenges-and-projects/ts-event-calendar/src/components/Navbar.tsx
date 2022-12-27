import { Layout, Menu, Row } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../routes';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { logout } = useActions();

  const { isAuth, user } = useTypedSelector((state) => state.auth);
  return (
    <Layout.Header>
      <Row justify="end">
        <div style={{ color: 'white' }}>{user.username}</div>
        {isAuth ? (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item onClick={() => logout()} key={1}>
              Log out
            </Menu.Item>
          </Menu>
        ) : (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item onClick={() => navigate(RouteNames.LOGIN)} key={2}>
              Login
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
