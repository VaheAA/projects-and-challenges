enum JobStatusEnum {
  interview = 'interview',
  declined = 'declined',
  pending = 'pending'
}


export interface IJob {
  _id?: string;
  company: string;
  position: string;
  status: JobStatusEnum;
}

export interface IUserJobs {
  jobs: IJob[];
}


export type JobContextType = {
  jobs: IJob[];
  job: IJob | null;
  loading: boolean;
  error: Error | null;
  addJob: (IJob) => Promise<void>;
  getJobs: () => Promise<void>;
  getJobById: (string) => Promise<void>;
  updateJobById: (IJob, string) => Promise<void>;
  deleteJobById: (string) => Promise<void>;
};