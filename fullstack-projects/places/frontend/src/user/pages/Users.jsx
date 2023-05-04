import { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import { useFetch } from '../../shared/hooks/useFetch';

const Users = () => {
  const { clearError, error, isLoading, sendRequest } = useFetch();
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}/users`
        );

        setUsers(data.users);
      } catch (error) {}
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && <UsersList items={users} />}
    </>
  );
};

export default Users;
