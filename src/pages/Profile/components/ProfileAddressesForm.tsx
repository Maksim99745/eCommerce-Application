import { Customer } from '@commercetools/platform-sdk';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  useEventCallback,
} from '@mui/material';
import { CheckboxElement, FormContainer, useFieldArray, useForm, useWatch } from 'react-hook-form-mui';
import { UserAddressComponent } from '@pages/Registration/components/UserAddress.component';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileAddressesSchema } from '@core/validation/user-profile/user-profile.schema';
import { ProfileAddressFormData } from '@models/forms.model';
import { getCustomerProfileAddresses, getNewUserProfileAddress, toAddressString } from '@utils/user-address-utils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorIcon from '@mui/icons-material/Error';
import { useEditableFormState } from '@components/EditableFormActionsBar/useEditableFormState';
import { RemoveProfileAddressProps } from '@pages/Profile/components/RemoveProfileAddress.dialog';
import { AddressTypeRenderer } from '@pages/Profile/components/AddressTypeRenderer';
import { OperationResult } from '@models/index';
import { useEffect } from 'react';
import { AddNewAddressProps, ProfileAddressModal } from './ProfileAddressModal';

export type UserAddressesFormProps = {
  isLoading?: boolean;
  userData: Customer;
  onSubmitAdd: (address: ProfileAddressFormData, addressIndex: number) => Promise<OperationResult>;
  onSubmitRemove: (address: ProfileAddressFormData) => Promise<OperationResult>;
  onSubmitUpdate: (address: ProfileAddressFormData) => Promise<OperationResult>;
};

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

  const { control, trigger, formState, reset } = formContext;
  const { fields, append } = useFieldArray({
    control,
    name: 'addresses',
  });
  const currentAddresses = useWatch({ control, name: 'addresses' });
  // It does n't rerender without it
  useEffect(() => {
    reset(getCustomerProfileAddresses(userData));
  }, [userData, reset]);

  const handleRemoveAddress = useEventCallback<RemoveProfileAddressProps['onSubmitRemove']>(async (address) => {
    setIsSaving(true);
    const result = await onSubmitRemove(address);
    setIsSaving(false);
    if (result.success) {
      setViewMode('view');
    }
  });

  const handleAddNewAddress = useEventCallback<AddNewAddressProps['onSubmitSave']>(async (addressIndex) => {
    setIsSaving(true);
    const result = await onSubmitAdd(currentAddresses[addressIndex], addressIndex);
    setIsSaving(false);
    if (result.success) {
      setViewMode('view');
    }
  });

  const handleUpdateAddress = useEventCallback<AddNewAddressProps['onSubmitUpdate']>(async (addressIndex) => {
    setIsSaving(true);
    const result = await onSubmitUpdate(currentAddresses[addressIndex]);
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
            <Button
              variant="contained"
              disabled={isBusy}
              onClick={() => {
                append(getNewUserProfileAddress());
              }}
            >
              Add
            </Button>
          </Stack>
          <Stack spacing={0} direction="column" sx={{ overflowX: 'auto' }}>
            {fields.map((address, index) => (
              <Accordion key={address.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} key={address.id}>
                  <Stack width={1} direction="row" sx={{ overflow: 'hidden' }}>
                    {!!formState?.errors?.addresses?.[index] && <ErrorIcon color="error" />}
                    <AddressTypeRenderer address={address} sx={{ mr: 2 }} />
                    <Typography
                      sx={{
                        textWrap: 'pretty',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                      }}
                    >
                      {toAddressString(address)}
                    </Typography>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails key={address.id} sx={{ display: 'flex', justifyContent: 'right' }}>
                  <ProfileAddressModal
                    index={index}
                    address={address}
                    isDisabled={isBusy || isLoading}
                    onSubmitSave={handleAddNewAddress}
                    onSubmitUpdate={handleUpdateAddress}
                    onSubmitRemove={handleRemoveAddress}
                    isValid={formState.isValid}
                    AddressComponent={
                      <UserAddressComponent
                        disabled={isLoading || isBusy}
                        isReadonly={isLoading || isBusy}
                        addressIndex={index}
                        // TODO move those checkboxes usage in edit mode of modal
                        title={
                          <Stack direction="row" alignItems="center">
                            <CheckboxElement name={`addresses.${index}.isShipping`} label="Shipping" />
                            <CheckboxElement name={`addresses.${index}.isBilling`} label="Billing" />
                          </Stack>
                        }
                        onCountryChange={() => trigger(`addresses.${index}.postalCode`)}
                      />
                    }
                  />
                </AccordionDetails>
                <AccordionActions />
              </Accordion>
            ))}
          </Stack>
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
