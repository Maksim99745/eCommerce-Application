import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useEventCallback } from '@mui/material';
import { useModalState } from '@hooks/useModalState';
import { ProfileAddressFormData } from '@models/forms.model';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';
import { RemoveProfileAddress } from './RemoveProfileAddress.dialog';

export interface AddNewAddressProps {
  index: number;
  address: ProfileAddressFormData;
  isDisabled: boolean;
  onSubmitSave: (index: number) => void;
  onSubmitUpdate: (index: number) => void;
  onSubmitRemove: (address: ProfileAddressFormData) => void;
  AddressComponent: JSX.Element;
  isValid: boolean;
}

export function ProfileAddressModal({
  index,
  onSubmitSave,
  onSubmitUpdate,
  onSubmitRemove,
  AddressComponent,
  isDisabled,
  address,
  isValid,
}: AddNewAddressProps) {
  const { visible, show, close } = useModalState();

  const handleSubmitAddress = useEventCallback(() => {
    if (address.isNewAddress === true) {
      onSubmitSave(index);
    } else {
      onSubmitUpdate(index);
    }
    close();
  });

  return (
    <>
      <LoadingButton
        variant="contained"
        color="primary"
        loading={isDisabled}
        sx={{ textTransform: 'none', mr: '10px' }}
        disabled={isDisabled}
        size="small"
        onClick={() => show()}
      >
        <EditIcon sx={{ mr: 1 }} />
        EDIT
      </LoadingButton>
      <RemoveProfileAddress address={address} disabled={isDisabled} onSubmitRemove={onSubmitRemove} />
      <Dialog
        open={visible}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add new address</DialogTitle>
        <DialogContent>{AddressComponent}</DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmitAddress} disabled={!isValid} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
