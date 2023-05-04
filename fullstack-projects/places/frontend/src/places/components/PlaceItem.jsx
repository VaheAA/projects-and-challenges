import { useState, useContext } from 'react';
import Card from '../../shared/components/UI/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UI/Modal';
import Map from '../../shared/components/UI/Map';
import { AuthContext } from '../../shared/context/authContext';
import { useFetch } from '../../shared/hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import './PlaceItem.css';
import ErrorModal from '../../shared/components/Ui/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

const PlaceItem = ({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates,
  onDelete
}) => {
  const [showMap, setShowMap] = useState(false);
  const { isLoggedIn, token, userId } = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { clearError, error, isLoading, sendRequest } = useFetch();

  const openMapHandler = () => setShowMap(true);
  const closeMaphandler = () => setShowMap(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteWarningHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${import.meta.env.VITE_APP_BACKEND_URL}/places/${id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${token}`
        }
      );
      onDelete(id);
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMaphandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item_modal-actions"
        footer={<Button onClick={closeMaphandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        header="Are you sure?"
        onCancel={cancelDeleteWarningHandler}
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${import.meta.env.VITE_APP_ASSET_URL}/${image}`}
              alt={title}
            />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              View on map
            </Button>
            {userId === creatorId && <Button to={`/places/${id}`}>Edit</Button>}
            {userId === creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
