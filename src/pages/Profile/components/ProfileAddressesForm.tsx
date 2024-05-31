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
import { OperationResult } from '@models/index';
import { AddressStringRenderer } from '@pages/Profile/components/AddressStringRenderer';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonProps } from '@mui/material/Button/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { ProfileAddressEditDialog, ProfileAddressEditDialogProps } from './ProfileAddressEdit.dialog';

export type UserAddressesFormProps = {
  isLoading?: boolean;
  userData: Customer;
  onSubmitAdd: (address: ProfileAddressFormData) => Promise<OperationResult>;
  onSubmitRemove: (address: ProfileAddressFormData) => Promise<OperationResult>;
  onSubmitUpdate: (address: ProfileAddressFormData) => Promise<OperationResult>;
};

function RemoveAddressLine(props: ButtonProps) {
  return (
    <Button variant="contained" {...props}>
      <DeleteIcon sx={{ mr: 1 }} />
      Remove
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
  // It does n't rerender without it
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
    <Container maxWidth="md">
      <FormContainer formContext={formContext}>
        <Paper elevation={1} sx={{ p: '2vh 3%', width: '100%' }}>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="start">
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              Addresses information
            </Typography>
          </Stack>
          <Stack spacing={0} direction="column" sx={{ overflowX: 'auto' }}>
            {fields.map((address, index) => (
              <Stack key={address.id} width={1} direction="row" sx={{ overflow: 'hidden', mt: 2 }}>
                <AddressTypeRenderer address={address} sx={{ mr: 2 }} />
                <AddressStringRenderer address={address} />
                <ProfileAddressEditDialog
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
          {/* TODO - move them usages to the separate form (edit/cancel/save), similar to password and/or Personal info */}
          {/* <Grid container item sx={{ pt: 2 }} spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1, md: 2 }} maxWidth="85vw"> */}
          {/*  <Grid item xs={2}> */}
          {/*    <FormLabel sx={{ pb: 1 }}>Default addresses</FormLabel> */}
          {/*  </Grid> */}
          {/*  <Grid item xs={1}> */}
          {/*    <SelectElement<ProfileAddressesFormData> */}
          {/*      label="Default shipping address" */}
          {/*      name="defaultShippingAddressIdx" */}
          {/*      options={getShippingAddressOptions(currentAddresses)} */}
          {/*      helperText=" " */}
          {/*      required */}
          {/*      disabled={isBusy || isReadonly} */}
          {/*      InputProps={{ */}
          {/*        readOnly: isReadonly, */}
          {/*      }} */}
          {/*      fullWidth */}
          {/*    /> */}
          {/*  </Grid> */}
          {/*  <Grid item xs={1}> */}
          {/*    <SelectElement<ProfileAddressesFormData> */}
          {/*      label="Default billing address" */}
          {/*      name="defaultBillingAddressIdx" */}
          {/*      options={getBillingAddressOptions(currentAddresses)} */}
          {/*      helperText=" " */}
          {/*      required */}
          {/*      disabled={isBusy || isReadonly} */}
          {/*      InputProps={{ */}
          {/*        readOnly: isReadonly, */}
          {/*      }} */}
          {/*      fullWidth */}
          {/*    /> */}
          {/*  </Grid> */}
          {/* </Grid> */}
        </Paper>
      </FormContainer>
    </Container>
  );
}
