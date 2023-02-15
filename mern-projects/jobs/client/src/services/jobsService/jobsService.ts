import $jobsHost from '../jobsService';
import { IJob } from '../../models/job';

// Create new job
export const createJob = async (jobObj: IJob) => {
  const { data } = await $jobsHost.post('/',
    jobObj
  );
  return data.job;
};

// Get all Jobs for the user
export const getAllJobs = async (): Promise<IJob[]> => {
  const { data } = await $jobsHost.get('/');
  return data.jobs;
};

// Get Job by Id
export const getSingleJob = async (id: string): Promise<IJob> => {
  const { data } = await $jobsHost.get(`/${id}`);
  return data.job;
};

// Delete Job by ID
export const deleteJob = async (id: string): Promise<void> => {
  await $jobsHost.delete(`/${id}`);
};

// Update Job by Id
export const updateJob = async (jobObj: IJob, id: string): Promise<void> => {
  await $jobsHost.patch(`/${id}`, jobObj);
};