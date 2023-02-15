import { useEffect, useContext, useCallback, useState } from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography, List, ListItem, Chip, CardHeader, IconButton } from '@mui/material';
import { JobContext } from '../../../context/job/JobContext';
import { JobContextType } from '../../../models/job';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal';
import { Link, useNavigate } from 'react-router-dom';

enum JobStatusEnum {
  interview = 'interview',
  declined = 'declined',
  pending = 'pending'
}


export default function JobsList(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [jobToDelete, setJobToDelete] = useState<string | undefined>('');

  const { getJobs, jobs, loading, deleteJobById, error } = useContext(JobContext) as JobContextType;
  const navigate = useNavigate();
  const memoizedGetJobs = useCallback(async () => {
    await getJobs();
  }, []);

  const getJobStatusColor = (status: JobStatusEnum) => {
    switch (status) {
      case 'pending':
        return 'primary';
        break;
      case 'interview':
        return 'success';
        break;
      case 'declined':
        return 'error';
        break;
      default:
        return 'primary';
    }
  };

  useEffect(() => {
    memoizedGetJobs();
  }, []);

  const openDeleteModal = (id: string | undefined) => {
    setIsModalOpen(true);
    setJobToDelete(id);
  };

  const handleDelete = async (id: string | undefined) => {
    await deleteJobById(id);
    setIsModalOpen(false);
    setJobToDelete(undefined);
  };

  const handleEdit = (id: string) => {
    navigate(`/jobs/${id}`);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (jobs.length === 0) {
    return <h1>No jobs found, add now!</h1>;
  }

  return (
    <>
      <Box>
        <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {jobs.map(job => (
            <ListItem key={job._id} sx={{ maxWidth: '33%' }}>
              <Card sx={{ width: '100%' }}>
                <CardHeader action={<IconButton onClick={() => openDeleteModal(job._id)} color="error"> <DeleteIcon /> </IconButton>} title={`Company: ${job.company}`} />
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" color="text.secondary" >Position: {job.position}</Typography>
                  <Chip size="small" label={`Status: ${job.status}`} color={getJobStatusColor(job.status)} sx={{ alignSelf: 'flex-end' }} />
                </CardContent>
                <CardActions>
                  <Link to={`/jobs/${job._id}`} >Edit</Link>
                </CardActions>
              </Card>
            </ListItem>))}
        </List>
      </Box>
      <DeleteModal open={isModalOpen} onDelete={() => handleDelete(jobToDelete)} />
    </>

  );
}

