import { useState, ReactNode } from 'react';
import { Button, Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  children: ReactNode;
  open: boolean;
};


const MainModal = ({ children, open }: Props) => {

  const navigate = useNavigate();

  const handleClose = () => navigate('/jobs');

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default MainModal;


