import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UI/Card';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/useForm';
import { useFetch } from '../../shared/hooks/useFetch';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorModal from '../../shared/components/Ui/ErrorModal';
import { AuthContext } from '../../shared/context/authContext';
import './PlaceForm.css';

const UpdatePlace = () => {
  const [loadedPlace, setLoadedPlace] = useState();
  const { placeId } = useParams();
  const { userId, token } = useContext(AuthContext);
  const { clearError, error, isLoading, sendRequest } = useFetch();
  const navigate = useNavigate();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const data = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlace(data.place);
        setFormData(
          {
            title: {
              value: data.place.title,
              isValid: true
            },
            description: {
              value: data.place.description,
              isValid: true
            }
          },
          true
        );
      } catch (error) {}
    };

    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.VITE_APP_BACKEND_URL}/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      );
      navigate(`/${userId}/places`);
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find the place</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid title"
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter valid description"
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
