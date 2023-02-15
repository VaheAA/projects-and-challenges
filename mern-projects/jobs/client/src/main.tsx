import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import MainAlert from './components/shared/alert/Alert';
import { AlertProvider } from './context/alert/AlertContext';
import { JobProvider } from './context/job/JobContext';
import { UserProvider } from './context/user/UserContext';

import router from './router/router';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <JobProvider>
        <AlertProvider>
          <MainAlert />
          <RouterProvider router={router} />
        </AlertProvider>
      </JobProvider>
    </UserProvider>
  </React.StrictMode>,
);
