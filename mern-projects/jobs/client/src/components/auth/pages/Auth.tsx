import { Box, Button, Typography, Stack, TextField } from '@mui/material';
import { useState, useContext } from 'react';
import { UserContext } from '../../../context/user/UserContext';
import { UserContextType } from '../../../models/user';
import { User, userSchema } from '../../../schema/userSchema';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertContext } from '../../../context/alert/AlertContext';
import { AlertContextType } from '../../../models/alert';
import { useNavigate } from 'react-router-dom';



export default function Auth(): JSX.Element {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);

  const { handleSubmit, register, unregister, reset, getValues, formState: { errors } } = useForm<User>({
    mode: 'onBlur',
    resolver: zodResolver(userSchema)
  });

  const navigate = useNavigate();
  const { error, loading, register: registerUser, login, logout } = useContext(UserContext) as UserContextType;
  const { initAlert } = useContext(AlertContext) as AlertContextType;

  function changeLoginMode() {
    setIsLoginMode(prev => !prev);

    if (isLoginMode) {
      register('name', { required: true });
    } else {
      unregister('name');
    }
  }

  const onSubmitHandler: SubmitHandler<User> = async (values) => {
    const userData = {
      ...values
    };


    if (isLoginMode) {
      await login(userData);
    } else {
      await registerUser(userData);
      console.log(error);
    }
    if (!error) {
      initAlert('success', `You were successfully ${isLoginMode ? 'logged in' : 'registered'}`);
      navigate('/jobs');
    } else {
      initAlert('error', error?.response?.data.msg);
    }

    reset();
  };


  return (
    <Box>
      <Stack justifyContent="center" alignItems="center" spacing={4} maxWidth={500} mx="auto">
        <Typography variant='h2'>{isLoginMode ? 'Login' : 'Register'}</Typography>
        <Box component="form" width="100%" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit(onSubmitHandler)} noValidate>
          {!isLoginMode && <TextField {...register('name')} error={errors.name && true} helperText={errors.name?.message} id="name" name="name" label="Name" variant="outlined" />}
          <TextField error={errors.email && true} helperText={errors.email?.message} {...register('email')} id="email" name="email" type="email" label="Email" variant="outlined" />
          <TextField error={errors.password && true} helperText={errors.password?.message} {...register('password')} id="password" name="password" type="password" label="Password" variant="outlined" />
          <Button disabled={loading} type="submit" variant="contained" size="large">{isLoginMode ? 'Login' : 'Register'}</Button>
          {error && <Typography color="error">{error.response?.data.msg}</Typography>}
        </Box>
        <Stack>
          <Typography variant="body1">Already have an account?
          </Typography>
          <Button variant="text" size="small" onClick={changeLoginMode}>{isLoginMode ? 'Register' : 'Login'}</Button>
        </Stack>
      </Stack>
    </Box>
  );
}