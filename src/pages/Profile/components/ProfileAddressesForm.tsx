import { Customer } from '@commercetools/platform-sdk';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useEventCallback,
} from '@mui/material';
import { FormContainer, RadioButtonGroup, SelectElement, useFieldArray, useForm, useWatch } from 'react-hook-form-mui';
import { UserAddressComponent } from '@pages/Registration/components/UserAddress.component';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressTypeOptions } from '@core/validation/user-registration/user-registration.const';
import { profileAddressesSchema } from '@core/validation/user-profile/user-profile.schema';
import { ProfileAddressesFormData } from '@models/forms.model';
import {
  toAddressString,
  useAddressRenderOptions,
  getDefaultUserProfileAddress,
  getCustomerProfileAddresses,
} from '@utils/user-address-utils';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { AddressTypeRenderer } from '@components/AddressType/AddressTypeRenderer';
import {
  EditableFormActionsBar,
  FormActionsToolBarProps,
} from '@components/EditableFormActionsBar/EditableFormActionsBar';
import { useEditableFormState } from '@components/EditableFormActionsBar/useEditableFormState';

export type UserAddressesFormProps = {
  isLoading?: boolean;
  userData: Customer;
  onSubmit: (addresses: ProfileAddressesFormData) => Promise<{ success: true } | { success: false; error: Error }>;
};

export function ProfileAddressesForm({ userData, onSubmit, isLoading = false }: UserAddressesFormProps) {
  const { isBusy, isReadonly, viewMode, setViewMode } = useEditableFormState({ isLoading });
  const formContext = useForm<ProfileAddressesFormData>({
    defaultValues: getCustomerProfileAddresses(userData),
    resolver: zodResolver(profileAddressesSchema),
    mode: 'all',
  });

  const { control, watch, reset, trigger, formState } = formContext;
  const { fields, append, remove } = useFieldArray<ProfileAddressesFormData>({
    control,
    name: 'addresses',
  });
  const currentAddresses = useWatch({ control, name: 'addresses' });

  const getShippingAddressOptions = useAddressRenderOptions('shipping');
  const getBillingAddressOptions = useAddressRenderOptions('billing');

  const handleFormModeAction = useEventCallback<FormActionsToolBarProps['onAction']>((action) => {
    if (action === 'edit') {
      setViewMode('edit');
    } else if (action === 'cancel') {
      setViewMode('view');
      reset();
    }
  });

  return (
    <Container maxWidth="md">
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <Paper elevation={1} sx={{ p: '2vh 3%', width: '100%' }}>
          <Stack spacing={2} direction="row" justifyContent="space-between">
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              Addresses information
            </Typography>
            <EditableFormActionsBar
              mode={viewMode}
              onAction={handleFormModeAction}
              isLoading={isBusy}
              disabled={isBusy}
            >
              <Button variant="contained" disabled={isBusy} onClick={() => append(getDefaultUserProfileAddress())}>
                <AddCircleIcon sx={{ mr: 1 }} />
                Add
              </Button>
            </EditableFormActionsBar>
          </Stack>
          <Stack spacing={0} direction="column" sx={{ overflowX: 'auto' }}>
            {fields.map((address, index) => (
              <Accordion key={address.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} key={address.id}>
                  <Stack width={1} direction="row" sx={{ overflow: 'hidden' }}>
                    {!!formState?.errors?.addresses?.[index] && <ErrorIcon color="error" />}
                    <AddressTypeRenderer
                      addressType={watch(`addresses.${index}.addressType`) || address.addressType}
                      sx={{ mr: 2 }}
                    />
                    <Typography
                      sx={{
                        textWrap: 'pretty',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                      }}
                    >
                      {toAddressString(watch(`addresses.${index}`)) || toAddressString(address)}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails key={address.id}>
                  <UserAddressComponent
                    disabled={isBusy || isReadonly}
                    title={
                      <Stack direction="row" alignItems="center">
                        <RadioButtonGroup
                          name={`addresses.${index}.addressType`}
                          row
                          options={addressTypeOptions}
                          disabled={isBusy || isReadonly}
                        />
                        <Tooltip title="Remove address">
                          <span style={{ marginLeft: 'auto' }}>
                            <IconButton
                              aria-label="delete"
                              color="primary"
                              size="large"
                              disabled={isBusy || isReadonly}
                              onClick={() => {
                                // TODO nullify (set NO_IDX) appropriate defaultShippingAddressIdx or defaultBillingAddressIdx  if it is removed from addresses array
                                remove(index);
                              }}
                            >
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Stack>
                    }
                    addressIndex={index}
                    onCountryChange={() => trigger(`addresses.${index}.postalCode`)}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
          <Grid container item sx={{ pt: 2 }} spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1, md: 2 }} maxWidth="85vw">
            <Grid item xs={2}>
              <FormLabel sx={{ pb: 1 }}>Default addresses</FormLabel>
            </Grid>
            <Grid item xs={1}>
              <SelectElement<ProfileAddressesFormData>
                label="Default shipping address"
                name="defaultShippingAddressIdx"
                options={getShippingAddressOptions(currentAddresses)}
                helperText=" "
                required
                disabled={isBusy || isReadonly}
                InputProps={{
                  readOnly: isReadonly,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <SelectElement<ProfileAddressesFormData>
                label="Default billing address"
                name="defaultBillingAddressIdx"
                options={getBillingAddressOptions(currentAddresses)}
                helperText=" "
                required
                disabled={isBusy || isReadonly}
                InputProps={{
                  readOnly: isReadonly,
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
      </FormContainer>
    </Container>
  );
}
