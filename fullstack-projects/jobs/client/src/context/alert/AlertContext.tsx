import { createContext, ReactNode, useState } from 'react';
import { AlertContextType, IAlert } from '../../models/alert';
import { Alert, AlertColor } from '@mui/material';

type ContextProps = {
  children: ReactNode;
};

export const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider: React.FC<ContextProps> = ({ children }) => {
  const [alert, setAlert] = useState<IAlert | null>(null);


  const initAlert = (severity: AlertColor | undefined, message: string) => {
    setAlert({
      severity: severity,
      message: message
    });


    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  const onClose = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ alert, onClose, initAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
