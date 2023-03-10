import React, { useState, useContext } from 'react';
import './Authenticate.css';
import Card from '../../shared/components/UI/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/useForm';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import { useFetch } from '../../shared/hooks/useFetch';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/authContext';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Authenticate = () => {
  const [isLoginMode, setIsloginMode] = useState(true);

  const { login } = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const { clearError, error, isLoading, sendRequest } = useFetch();

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsloginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      try {
        const data = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-type': 'application/json'
          }
        );
        login(data.userId, data.token);
      } catch (error) {}
    } else {
      try {
        const formData = new FormData();

        formData.append('email', formState.inputs.email.value);
        formData.append('userName', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);

        const data = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}/users/signup`,
          'POST',
          formData
        );
        login(data.userId, data.token);
      } catch (error) {}
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              type="text"
              element="input"
              id="name"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please pick an image"
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'Login' : 'Signup'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoginMode ? 'signup' : 'login'}
        </Button>
      </Card>
    </>
  );
};

export default Authenticate;
