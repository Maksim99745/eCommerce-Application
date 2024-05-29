import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useEventCallback,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toAddressString } from '@utils/user-address-utils';
import { ProfileAddressFormData } from '@models/forms.model';
import { useModalState } from '@hooks/useModalState';

export interface RemoveProfileAddressProps {
  address: ProfileAddressFormData;
  disabled?: boolean;
  onSubmitRemove: (address: ProfileAddressFormData) => void;
}

export function RemoveProfileAddress({ address, disabled = false, onSubmitRemove }: RemoveProfileAddressProps) {
  const { visible, show, close } = useModalState();

  const handleSubmitRemove = useEventCallback(() => {
    close();
    onSubmitRemove(address);
  });

  return (
    <>
      <Button variant="contained" disabled={disabled} onClick={show}>
        <DeleteIcon sx={{ mr: 1 }} />
        Remove
      </Button>
      <Dialog
        open={visible}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove address</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are You sure to remove ${toAddressString(address)} address ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Disagree</Button>
          <Button onClick={handleSubmitRemove} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
