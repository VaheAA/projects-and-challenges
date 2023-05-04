import { z } from "zod";

enum JobStatusEnum {
  interview = 'interview',
  declined = 'declined',
  pending = 'pending'
}

export const newJobSchema = z.object({
  company: z.string().min(2, { message: "Company name must be provided" }),
  position: z.string().min(4, { message: "Position cannot be empty and must be at least 4 characters" }),
});


export const editJobSchema = z.object({
  company: z.string().min(2, { message: "Company name must be provided" }),
  position: z.string().min(4, { message: "Position cannot be empty and must be at least 4 characters" }),
  status: z.nativeEnum(JobStatusEnum, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_type':
          return { message: 'Status must be selected' };
        case 'invalid_enum_value':
          return { message: 'Status must be selected' };
        default:
          return { message: 'Status must be selected' };
      }
    },
  })
});

export type NewJobType = z.infer<typeof newJobSchema>;
export type EditJobType = z.infer<typeof editJobSchema>;