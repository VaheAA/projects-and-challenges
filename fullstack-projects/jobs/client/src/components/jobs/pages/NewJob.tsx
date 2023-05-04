import { useContext } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import MainModal from '../../shared/ui/MainModal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { newJobSchema, NewJobType } from '../../../schema/jobSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { JobContext } from '../../../context/job/JobContext';
import { JobContextType } from '../../../models/job';
import { AlertContext } from '../../../context/alert/AlertContext';
import { AlertContextType } from '../../../models/alert';
import { useNavigate } from 'react-router-dom';

export default function NewJob(): JSX.Element {


  const { handleSubmit, reset, register, clearErrors, formState: { errors } } = useForm<NewJobType>({
    mode: 'onBlur',
    resolver: zodResolver(newJobSchema)
  });

  const { addJob, loading, error } = useContext(JobContext) as JobContextType;
  const { initAlert } = useContext(AlertContext) as AlertContextType;
  const navigate = useNavigate();


  const onSubmitHandler: SubmitHandler<NewJobType> = async (values) => {
    await addJob({ ...values });
    navigate('/jobs');

    if (!error) {
      initAlert('success', `New job was successfully added`);
    } else {
      initAlert('error', error.message);
    }

    clearErrors();
    reset();
  };

  return (
    <MainModal open>
      <Typography variant='h5' mb={4}>Add a new Job</Typography>
      <Box component="form" width="100%" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <TextField id="company"  {...register('company')} error={errors.company && true} helperText={errors.company?.message} label="Company name" variant="outlined" />
        <TextField id="position" {...register('position')} error={errors.position && true} helperText={errors.position?.message} label="Position" variant="outlined" />
        <Button disabled={loading} type="submit" variant="contained" size="large">Create Job</Button>
      </Box>
    </MainModal>
  );
}