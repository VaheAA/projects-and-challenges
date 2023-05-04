import { Box, Button, Heading, Link, Stack, Text, useToast } from '@chakra-ui/react';
import TextInput from '../../components/fields/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userRegisterSchema, UserRegisterType } from '../../utils/schema/registerSchema';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import AuthContainier from '../../components/shared/AuthContainier';

const Register: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const toast = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserRegisterType>({
    mode: 'onBlur',
    resolver: zodResolver(userRegisterSchema)
  });


  const onSubmit: SubmitHandler<UserRegisterType> = async (values) => {

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(res.user, {
        displayName: values.username
      });
      setLoading(false);
      reset();
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 2500,
        isClosable: true,
        position: 'top-right'
      });
      navigate('/login');
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
      <Heading variant="h1" textAlign="center">Create new account and dive into the world of FoozBall!</Heading>
      <Box px={4} py={3} mt={8} boxShadow="md" rounded="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={4}>
            <TextInput type="text" placeholder="Username" label="Username" name="username" register={register} errors={errors} />
            <TextInput type="email" placeholder="Email" label="Email" name="email" register={register} errors={errors} />
            <TextInput type="password" placeholder="Password" label="Password" name="password" register={register} errors={errors} />
            <Button isLoading={loading} type="submit" colorScheme="orange">Register</Button>
          </Stack>
        </form>
        <Stack direction="row" spacing={2} alignItems="center" fontSize="18" mt={4}>
          <Text>Already have an account?</Text>
          <RouterLink to="/login">
            <Link color="orange.600">
              Login instead!
            </Link>
          </RouterLink>
        </Stack>
      </Box>
    </AuthContainier>
  );
};

export default Register;