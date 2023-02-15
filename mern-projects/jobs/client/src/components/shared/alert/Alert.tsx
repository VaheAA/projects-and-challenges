import { useContext } from 'react';
import { Alert } from '@mui/material';
import { AlertContext } from '../../../context/alert/AlertContext';
import { AlertContextType } from '../../../models/alert';


export default function MainAlert(): JSX.Element | null {

  const { alert } = useContext(AlertContext) as AlertContextType;

  return alert && <Alert severity={alert?.severity} sx={{ position: 'absolute', right: 0, bottom: 0, transform: 'translateY(-20%)', p: '16px', fontSize: '20px' }}>{alert?.message} </Alert>;
}