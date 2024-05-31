import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, useEventCallback } from '@mui/material';
import { useModalState } from '@hooks/useModalState';
import { ProfileAddressesFormData, ProfileAddressFormData } from '@models/forms.model';
import { CheckboxElement, useFormContext, useWatch } from 'react-hook-form-mui';
import { UserAddressComponent } from '@pages/Registration/components/UserAddress.component';
import ErrorIcon from '@mui/icons-material/Error';
import { ElementType } from 'react';

export interface ProfileAddressEditDialogProps {
  openControl: ElementType;
  addressIndex: number;
  disabled?: boolean;
  onSubmit: (address: ProfileAddressFormData) => void;
}

export function ProfileAddressEditDialog({
  addressIndex,
  openControl: OpenControl,
  onSubmit,
  disabled = false,
}: ProfileAddressEditDialogProps) {
  const { visible, show, close } = useModalState();

  const { trigger, control, formState } = useFormContext<ProfileAddressesFormData>();
  const currentAddress = useWatch({ control, name: `addresses.${addressIndex}` });
  const handleSubmitAddress = useEventCallback(() => {
    close();
    onSubmit(currentAddress);
  });

  return (
    <Box sx={{ ml: 'auto' }}>
      <OpenControl onClick={show} disabled={disabled} />
      <Dialog
        open={visible}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!!formState?.errors?.addresses?.[addressIndex] && <ErrorIcon color="error" />}
          Add new address
        </DialogTitle>
        <DialogContent>
          <UserAddressComponent
            addressIndex={addressIndex}
            // TODO move those checkboxes usage in edit mode of modal
            title={
              <Stack direction="row" alignItems="center">
                <CheckboxElement name={`addresses.${addressIndex}.isShipping`} label="Shipping" />
                <CheckboxElement name={`addresses.${addressIndex}.isBilling`} label="Billing" />
              </Stack>
            }
            onCountryChange={() => trigger(`addresses.${addressIndex}.postalCode`)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmitAddress} disabled={!formState.isValid} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
