import { Customer } from '@commercetools/platform-sdk';
import { Button, Container, Paper, Stack, Typography, useEventCallback } from '@mui/material';
import { FormContainer, useFieldArray, useForm } from 'react-hook-form-mui';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileAddressesSchema } from '@core/validation/user-profile/user-profile.schema';
import { ProfileAddressFormData } from '@models/forms.model';
import { getCustomerProfileAddresses, getNewUserProfileAddress } from '@utils/user-address-utils';
import { useEditableFormState } from '@components/EditableFormActionsBar/useEditableFormState';
import {
  ProfileAddressRemoveDialog,
  ProfileAddressRemoveDialogProps,
} from '@pages/Profile/components/ProfileAddressRemove.dialog';
import { AddressTypeRenderer } from '@pages/Profile/components/AddressTypeRenderer';
import { AddressStringRenderer } from '@pages/Profile/components/AddressStringRenderer';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonProps } from '@mui/material/Button/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { RemoteOperationCallback } from '@models/remoteOperationCallback';
import { ProfileAddressEditDialog, ProfileAddressEditDialogProps } from './ProfileAddressEdit.dialog';

export type UserAddressesFormProps = {
  isLoading?: boolean;
  userData: Customer;
  onSubmitAdd: RemoteOperationCallback<ProfileAddressFormData>;
  onSubmitRemove: RemoteOperationCallback<ProfileAddressFormData>;
  onSubmitUpdate: RemoteOperationCallback<ProfileAddressFormData>;
};

function RemoveAddressLine(props: ButtonProps) {
  return (
    <Button variant="contained" color="primary" sx={{ textTransform: 'none', mr: '10px' }} size="small" {...props}>
      <DeleteIcon sx={{ mr: 1, display: { xs: 'none', md: 'block' } }} />
      REMOVE
    </Button>
  );
}

function EditAddressLine(props: ButtonProps) {
  return (
    <Button variant="contained" color="primary" sx={{ textTransform: 'none', mr: '10px' }} size="small" {...props}>
      <EditIcon sx={{ mr: 1 }} />
      EDIT
    </Button>
  );
}

export function ProfileAddressesForm({
  userData,
  onSubmitAdd,
  onSubmitRemove,
  onSubmitUpdate,
  isLoading = false,
}: UserAddressesFormProps) {
  const { isBusy, setViewMode, setIsSaving } = useEditableFormState({ initialState: 'edit', isLoading });

  const formContext = useForm({
    defaultValues: getCustomerProfileAddresses(userData),
    resolver: zodResolver(profileAddressesSchema),
    mode: 'all',
  });

  const { control, reset } = formContext;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  useEffect(() => {
    reset(getCustomerProfileAddresses(userData));
  }, [userData, reset]);

  const handleRemoveAddress = useEventCallback<ProfileAddressRemoveDialogProps['onSubmit']>(async (address) => {
    if (address.isNewAddress) {
      remove(fields.findIndex(({ addressUID }) => addressUID === address.addressUID));
    } else {
      setIsSaving(true);
      const result = await onSubmitRemove(address);
      setIsSaving(false);
      if (result.success) {
        setViewMode('view');
      }
    }
  });

  const handleAddNewAddress = useEventCallback<ProfileAddressEditDialogProps['onSubmit']>(async (address) => {
    setIsSaving(true);
    const result = address.isNewAddress ? await onSubmitAdd(address) : await onSubmitUpdate(address);
    setIsSaving(false);
    if (result.success) {
      setViewMode('view');
    }
  });

  return (
    <Container maxWidth="md" sx={{ maxWidth: { xs: '100%', sm: 'md' } }}>
      <Paper elevation={1} sx={{ p: '2vh 3%', maxWidth: '100%' }}>
        <FormContainer formContext={formContext}>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="start">
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              Addresses information
            </Typography>
          </Stack>
          <Stack spacing={0} direction="column" sx={{ overflowX: 'auto' }}>
            {fields.map((address, index) => (
              <Stack
                key={address.id}
                width={1}
                direction="row"
                sx={{ overflow: 'hidden', mt: 2, mb: 1, alignItems: 'start' }}
              >
                <AddressTypeRenderer address={address} sx={{ mr: 2 }} />
                <AddressStringRenderer address={address} />
                <ProfileAddressEditDialog
                  isNewAddress={address.isNewAddress}
                  openControl={EditAddressLine}
                  addressIndex={index}
                  disabled={isBusy || isLoading}
                  onSubmit={handleAddNewAddress}
                />
                <ProfileAddressRemoveDialog
                  openControl={RemoveAddressLine}
                  addressIndex={index}
                  disabled={isBusy || isLoading}
                  onSubmit={handleRemoveAddress}
                />
              </Stack>
            ))}
          </Stack>
          {fields.every((address) => !address.isNewAddress) && (
            <Button
              variant="contained"
              disabled={isBusy}
              onClick={() => {
                append(getNewUserProfileAddress());
              }}
            >
              Add new address
            </Button>
          )}
        </FormContainer>
      </Paper>
    </Container>
  );
}
