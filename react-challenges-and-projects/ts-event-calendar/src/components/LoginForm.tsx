import { Form, Input, Button } from 'antd';
import { FC, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { rules } from '../utils/rules';

const LoginForm: FC = () => {
  const { error, isLoading } = useTypedSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useActions();
  const onSubmit = () => {
    login(username, password);
  };

  return (
    <Form
      onFinish={onSubmit}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required('Username is required')]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required('Password is required')]}
      >
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
