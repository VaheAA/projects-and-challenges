import { useContext } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useNavigate } from 'react-router-dom';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/useForm';
import { useFetch } from '../../shared/hooks/useFetch';
import { AuthContext } from '../../shared/context/authContext';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import './PlaceForm.css';

const NewPlace = () => {
  const { userId, token } = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
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

  const { clearError, error, isLoading, sendRequest } = useFetch();
  const naviagte = useNavigate();

  const placeSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);

      await sendRequest(
        `${import.meta.env.VITE_APP_BACKEND_URL}/places`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${token}`
        }
      );
      naviagte('/');
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            placeholder="Enter place title"
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description"
            placeholder="Enter place description at leat 5 characters long"
            onInput={inputHandler}
          />
          <ImageUpload
            id="image"
            onInput={inputHandler}
            errorText="Please pick an image"
          />
          <Input
            id="address"
            element="input"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address"
            placeholder="Enter place address"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Add place
          </Button>
        </form>
      )}
    </>
  );
};

export default NewPlace;
