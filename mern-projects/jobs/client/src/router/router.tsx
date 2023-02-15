import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Auth from '../components/auth/pages/Auth';
import NewJob from '../components/jobs/pages/NewJob';
import Jobs from '../components/jobs/pages/Jobs';
import RootLayout from '../components/shared/layout/RootLayout';
import PrivateRoute from './PrivateRoute';
import EditJob from '../components/jobs/pages/EditJob';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<PrivateRoute />}>
        <Route path="/jobs" element={<Jobs />}>
          <Route path="/jobs/new-job" element={<NewJob />} />
          <Route path="/jobs/:id" element={<EditJob />} />
        </Route>
      </Route>
      <Route path="/auth" element={<Auth />} />
    </Route>
  )
);



export default router;