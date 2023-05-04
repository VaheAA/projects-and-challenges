import { AlertColor } from '@mui/material';

export interface IAlert {
  severity: AlertColor | undefined;
  message: string;
}

export type AlertContextType = {
  alert: IAlert | null;
  onClose: () => void;
  initAlert: (string, string) => void;
};