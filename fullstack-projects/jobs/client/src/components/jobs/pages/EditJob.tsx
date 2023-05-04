import { useContext, useEffect, useMemo } from 'react';
import { Box, Typography, Button, TextField, Select, FormControl, InputLabel, MenuItem, FormHelperText } from '@mui/material';
import MainModal from '../../shared/ui/MainModal';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { JobContext } from '../../../context/job/JobContext';
import { IJob, JobContextType } from '../../../models/job';
import { EditJobType, editJobSchema } from '../../../schema/jobSchema';


export default function EditJob(): JSX.Element {

  const { error, loading, updateJobById, getJobById, job } = useContext(JobContext) as JobContextType;
  const { id } = useParams();
  const navigate = useNavigate();


  const { handleSubmit, reset, register, setValue, watch, formState: { errors } } = useForm<EditJobType>({
    mode: 'onBlur',
    resolver: zodResolver(editJobSchema),
    defaultValues: useMemo(() => {
      return {
        company: job?.company || '',
        position: job?.position || '',
        status: job?.status
      };
    }, [job])
  });

  useEffect(() => {
    const fetchJob = async () => {
      await getJobById(id);
    };
    fetchJob();
  }, []);

  useEffect(() => {
    if (job) {
      setValue('company', job.company);
      setValue('position', job.position);
      setValue('status', job.status);
    }

  }, [job]);

  const onSubmitHandler = async (values: IJob): Promise<void> => {

    await updateJobById({ ...values }, id);
    if (!error) {
      navigate('/jobs');
    }
  };



  return (
    <MainModal open>
      <Typography variant='h5' mb={4}>Edit a job</Typography>
      {loading && <h1>Loading...</h1>}
      {!loading && <Box component="form" width="100%" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <TextField id="company"  {...register('company')} error={errors.company && true} helperText={errors.company?.message} variant="outlined" />
        <TextField id="position" {...register('position')} error={errors.position && true} helperText={errors.position?.message} variant="outlined" />
        <FormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="status"
            error={errors.status && true}
            value={watch('status')}
            label="Status"
            {...register('status')}
          >
            {['pending', 'interview', 'declined'].map((status) => (
              <MenuItem key={status} value={status}>
                {status.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{errors.status?.message}</FormHelperText>
        </FormControl>
        <Button disabled={loading} type="submit" variant="contained" size="large">Update Job</Button>
      </Box>}
    </MainModal >
  );
}