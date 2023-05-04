import { useState } from 'react';
import { Box, Button, Heading, Stack, Text, Link, useToast } from '@chakra-ui/react';
import TextInput from '../../components/fields/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userLoginSchema, UserLoginType } from '../../utils/schema/loginSchema';
import { Link as RouterLink } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../store/reducers/auth/authSlice';
import { useAppDispatch } from '../../hooks/useTypedSelector';
import { IUser } from '../../types/user';
import AuthContainier from '../../components/shared/AuthContainier';


const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const { register, reset, handleSubmit, formState: { errors } } = useForm<UserLoginType>({
    mode: 'onBlur',
    resolver: zodResolver(userLoginSchema)
  });

  const onSubmit: SubmitHandler<UserLoginType> = async (values) => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, values.email, values.password);
      const userData: IUser = {
        id: res.user.uid,
        username: res.user.displayName,
        email: res.user.email
      };
      console.log(userData);
      dispatch(setCredentials(userData));
      setLoading(false);
      reset();
      toast({
        title: 'Logged in.',
        description: "You're logged in now!",
        status: 'success',
        duration: 2500,
        isClosable: true,
        position: 'top-right'
      });
      navigate('/countries');
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false);
        toast({
          title: 'Error occured',
          description: error.message,
          status: 'error',
          isClosable: true,
          position: 'top-right',
          duration: 2500
        });
        reset();
      }
    }
  };

  return (
    <AuthContainier>
      <Heading variant="h1" textAlign="center">Login and continue exploring FoozBall!</Heading>
      <Box px={4} py={3} mt={8} boxShadow="md" rounded="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={4}>
            <TextInput type="email" placeholder="Email" label="Email" name="email" register={register} errors={errors} />
            <TextInput type="password" placeholder="Password" label="Password" name="password" register={register} errors={errors} />
            <Button isLoading={loading} type="submit" colorScheme="orange">Login</Button>
          </Stack>
        </form>
        <Stack direction="row" spacing={2} alignItems="center" fontSize="18" mt={4}>
          <Text >Still don't have an account? </Text>
          <Link color="orange.700" to="/register" as={RouterLink}>
            Create now!
          </Link>
        </Stack>
      </Box>
    </AuthContainier>
  );
};

export default Login;