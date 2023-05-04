import { createContext, ReactNode, useState } from 'react';
import { createJob, getAllJobs, deleteJob, getSingleJob, updateJob } from '../../services/jobsService/jobsService';
import { IJob, JobContextType } from '../../models/job';

type ContextProps = {
  children: ReactNode;
};


export const JobContext = createContext<JobContextType | null>(null);

export const JobProvider: React.FC<ContextProps> = ({ children }) => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [job, setJob] = useState<IJob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const addJob = async (jobObj: IJob) => {
    try {
      setLoading(true);
      await createJob(jobObj);
      const data = await getAllJobs();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        setLoading(false);
      }
    }
  };

  const getJobs = async () => {
    try {
      setLoading(true);
      const data = await getAllJobs();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        setLoading(false);
      }
    }
  };

  const getJobById = async (id: string) => {
    try {
      setLoading(true);
      const data = await getSingleJob(id);
      setJob(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        setLoading(false);
      }
    }
  };

  const deleteJobById = async (id: string) => {
    try {
      setLoading(true);
      await deleteJob(id);
      const data = await getAllJobs();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        setLoading(false);
      }
    }
  };

  const updateJobById = async (jobObj: IJob, id: string) => {
    try {
      setLoading(true);
      await updateJob(jobObj, id);
      const data = await getAllJobs();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        setLoading(false);
      }
    }
  };



  return (
    <JobContext.Provider value={{ jobs, job, loading, error, addJob, getJobs, getJobById, deleteJobById, updateJobById }}>
      {children}
    </JobContext.Provider>
  );

};