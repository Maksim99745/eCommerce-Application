import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useEventCallback } from '@mui/material';
import { useModalState } from '@hooks/useModalState';
import { ProfileAddressFormData } from '@models/forms.model';
import {
  EditableFormActionsBar,
  FormActionsToolBarProps,
} from '@components/EditableFormActionsBar/EditableFormActionsBar';
import { useEditableFormState } from '@components/EditableFormActionsBar/useEditableFormState';

export interface AddNewAddressProps {
  address: ProfileAddressFormData;
  isDisabled: boolean;
  onSubmitSave: (newAddress: ProfileAddressFormData) => void;
  onSubmitUpdate: (newAddress: ProfileAddressFormData) => void;
  AddressComponent: JSX.Element;
}

export function ProfileAddressModal({
  onSubmitSave,
  onSubmitUpdate,
  AddressComponent,
  isDisabled,
  address,
}: AddNewAddressProps) {
  const { isBusy, isReadonly, viewMode, setViewMode, setIsSaving } = useEditableFormState({ isLoading: isDisabled });
  const { visible, show, close } = useModalState();

  const handleFormModeAction = useEventCallback<FormActionsToolBarProps['onAction']>((action) => {
    if (action === 'edit') {
      setViewMode('edit');
      show();
    } else if (action === 'cancel') {
      setViewMode('view');
      close();
    }
  });

  const handleSubmitAddress = useEventCallback(() => {
    if (address.isNewAddress === true) {
      onSubmitSave(address);
    } else {
      onSubmitUpdate(address);
    }
    close();
  });

  return (
    <>
      <EditableFormActionsBar
        mode={viewMode}
        onAction={handleFormModeAction}
        isLoading={isDisabled}
        disabled={isDisabled}
      />
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
          <Button onClick={handleSubmitAddress} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
