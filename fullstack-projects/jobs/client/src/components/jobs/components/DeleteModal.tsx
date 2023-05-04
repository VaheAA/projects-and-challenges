import { Button, Stack, Typography } from '@mui/material';
import MainModal from '../../shared/ui/MainModal';


type Props = {
  open: boolean;
  onDelete: () => Promise<void>;
};


export default function DeleteModal({ open, onDelete }: Props): JSX.Element {

  return (
    <MainModal open={open}>
      <Stack spacing={4}>
        <Typography variant="h5">Are you sure?</Typography>
        <Typography variant="subtitle2">It can't be undone</Typography>
        <Button variant="contained" color="error" onClick={onDelete}>Delete job</Button>
      </Stack>
    </MainModal>
  );
}