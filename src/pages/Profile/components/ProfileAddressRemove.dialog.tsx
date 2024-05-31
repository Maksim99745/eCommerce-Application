import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useEventCallback,
} from '@mui/material';
import { toAddressString } from '@utils/user-address-utils';
import { ProfileAddressesFormData, ProfileAddressFormData } from '@models/forms.model';
import { useModalState } from '@hooks/useModalState';
import { ElementType } from 'react';
import { useFormContext, useWatch } from 'react-hook-form-mui';

export interface ProfileAddressRemoveDialogProps {
  openControl: ElementType;
  addressIndex: number;
  disabled?: boolean;
  onSubmit: (address: ProfileAddressFormData) => void;
}

export function ProfileAddressRemoveDialog({
  openControl: OpenControl,
  addressIndex,
  disabled = false,
  onSubmit,
}: ProfileAddressRemoveDialogProps) {
  const { visible, show, close } = useModalState();
  const { control } = useFormContext<ProfileAddressesFormData>();
  const currentAddress = useWatch({ control, name: `addresses.${addressIndex}` });

  const handleSubmitRemove = useEventCallback(() => {
    close();
    onSubmit(currentAddress);
  });

  return (
    <>
      <OpenControl onClick={show} disabled={disabled} />

      <Dialog
        open={visible}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove address</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are You sure to remove ${toAddressString(currentAddress)} address ?`}
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
