import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', width: "100%", height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;