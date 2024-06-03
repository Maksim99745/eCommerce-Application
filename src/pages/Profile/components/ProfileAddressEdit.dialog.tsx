import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Stack,
  Typography,
  useEventCallback,
} from '@mui/material';
import { useModalState } from '@hooks/useModalState';
import { ProfileAddressesFormData, ProfileAddressFormData } from '@models/forms.model';
import { CheckboxElement, useFormContext, useWatch } from 'react-hook-form-mui';
import { UserAddressComponent } from '@pages/Registration/components/UserAddress.component';
import ErrorIcon from '@mui/icons-material/Error';
import { ElementType } from 'react';
import { RegistrationErrorMessages } from '@core/validation/user-registration/user-registration.enum';

export interface ProfileAddressEditDialogProps {
  isNewAddress: boolean;
  openControl: ElementType;
  addressIndex: number;
  disabled?: boolean;
  onSubmit: (address: ProfileAddressFormData) => void;
}

export function ProfileAddressEditDialog({
  isNewAddress,
  addressIndex,
  openControl: OpenControl,
  onSubmit,
  disabled = false,
}: ProfileAddressEditDialogProps) {
  const { visible, show, close } = useModalState();

  const { trigger, control, formState, watch } = useFormContext<ProfileAddressesFormData>();
  const currentAddress = useWatch({ control, name: `addresses.${addressIndex}` });
  const handleSubmitAddress = useEventCallback(() => {
    close();
    onSubmit(currentAddress);
  });

  const watchIsShipping = watch(`addresses.${addressIndex}.isShipping`);
  const watchIsBilling = watch(`addresses.${addressIndex}.isBilling`);

  let { isValid } = formState;

  if (!watchIsShipping && !watchIsBilling) {
    isValid = false;
  }

  return (
    <Box sx={{ ml: 'auto' }}>
      <OpenControl onClick={show} disabled={disabled} />
      <Dialog
        open={visible}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" alignSelf="center">
          {!!formState?.errors?.addresses?.[addressIndex] && <ErrorIcon color="error" />}
          {isNewAddress ? 'Add new address' : 'Update address'}
        </DialogTitle>
        <DialogContent>
          <UserAddressComponent
            addressIndex={addressIndex}
            title={
              <Stack>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Select address type
                </Typography>
                <Stack alignContent="center">
                  <CheckboxElement name={`addresses.${addressIndex}.isShipping`} label="* Shipping" />
                  <CheckboxElement name={`addresses.${addressIndex}.isBilling`} label="* Billing" />
                  {!watchIsShipping && !watchIsBilling ? (
                    <FormHelperText error>{RegistrationErrorMessages.AddressTypeRequired}</FormHelperText>
                  ) : (
                    <FormHelperText error> </FormHelperText>
                  )}
                </Stack>
              </Stack>
            }
            onCountryChange={() => trigger(`addresses.${addressIndex}.postalCode`)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmitAddress} disabled={!isValid} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
