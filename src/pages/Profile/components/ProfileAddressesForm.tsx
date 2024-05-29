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
import { FormContainer, useFieldArray, useForm } from 'react-hook-form-mui';
import { UserAddressComponent } from '@pages/Registration/components/UserAddress.component';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileAddressesSchema } from '@core/validation/user-profile/user-profile.schema';
import { ProfileAddressFormData } from '@models/forms.model';
import { getCustomerProfileAddresses, toAddressString } from '@utils/user-address-utils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useEditableFormState } from '@components/EditableFormActionsBar/useEditableFormState';
import { RemoveProfileAddress, RemoveProfileAddressProps } from '@pages/Profile/components/RemoveProfileAddress.dialog';
import { AddressTypeRenderer } from '@pages/Profile/components/AddressTypeRenderer';
import { OperationResult } from '@models/index';

export type AddressFormSubmitAction = 'add' | 'update' | 'remove';
export type UserAddressesFormProps = {
  isLoading?: boolean;
  userData: Customer;
  onSubmit: (action: AddressFormSubmitAction, address: ProfileAddressFormData) => Promise<OperationResult>;
};

export function ProfileAddressesForm({ userData, onSubmit, isLoading = false }: UserAddressesFormProps) {
  const { isBusy, isReadonly, setViewMode, setIsSaving } = useEditableFormState({ initialState: 'edit', isLoading });

  const defaultValues = getCustomerProfileAddresses(userData);

  const formContext = useForm({
    defaultValues,
    resolver: zodResolver(profileAddressesSchema),
    mode: 'all',
  });

  const { control, formState } = formContext;
  const { fields } = useFieldArray({
    control,
    name: 'addresses',
  });

  // console.log('Default Values:', defaultValues.addresses);
  // console.log('Fields:', fields);

  const handleRemoveAddress = useEventCallback<RemoveProfileAddressProps['onSubmitRemove']>(async (address) => {
    setIsSaving(true);
    const result = await onSubmit('remove', address);
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
              disabled={isBusy || isReadonly}
              onClick={() => {
                // TODO open modal with address prepopulated with getNewUserProfileAddress()
                // append(getNewUserProfileAddress());
              }}
            >
              <AddCircleIcon sx={{ mr: 1 }} />
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
                <AccordionDetails key={address.id}>
                  <UserAddressComponent
                    disabled={isBusy}
                    isReadonly
                    addressIndex={index}
                    // TODO move those checkboxes usage in edit mode of modal
                    // title={
                    //   <Stack direction="row" alignItems="center">
                    //     <CheckboxElement name={`addresses.${index}.isShipping`} label="Shipping" disabled />
                    //     <CheckboxElement name={`addresses.${index}.isBilling`} label="Billing" disabled />
                    //   </Stack>
                    // }
                    // onCountryChange={() => trigger(`addresses.${index}.postalCode`)}
                  />
                </AccordionDetails>
                <AccordionActions>
                  <RemoveProfileAddress
                    address={address}
                    disabled={isBusy || isReadonly}
                    onSubmitRemove={handleRemoveAddress}
                  />
                </AccordionActions>
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
