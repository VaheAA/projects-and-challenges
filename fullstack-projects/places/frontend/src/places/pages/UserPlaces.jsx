import { useEffect, useState } from 'react';
import PlaceList from '../components/PlaceList';
import { useFetch } from '../../shared/hooks/useFetch';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorModal from '../../shared/components/Ui/ErrorModal';

const UserPlaces = () => {
  const { userId } = useParams();
  const [loadedPlaces, setLoadedPlaces] = useState(null);
  const { clearError, error, isLoading, sendRequest } = useFetch();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(data.places);
      } catch (error) {}
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prev) =>
      prev.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={placeDeletedHandler} />
      )}
    </>
  );
};

export default UserPlaces;
