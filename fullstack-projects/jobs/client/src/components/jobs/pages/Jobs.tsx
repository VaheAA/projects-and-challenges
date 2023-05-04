import { Button } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import JobsList from '../components/JobsList';

export default function Jobs(): JSX.Element {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/jobs/new-job');
  };


  return (
    <>
      <Outlet />
      <Button variant="contained" sx={{ textDecoration: 'none' }} onClick={handleNavigate}>Add a new Job</Button>
      <JobsList />
    </>
  );
};