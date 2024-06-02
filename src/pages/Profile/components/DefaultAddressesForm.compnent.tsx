import { OperationResult, RegistrationFormData } from '@models/index';
import {
  getCustomerProfileAddresses,
  getDefaultAddressIndex,
  useAddressRenderOptions,
} from '@utils/user-address-utils';
import { FormProvider, SelectElement, useForm } from 'react-hook-form-mui';
import { Customer } from '@commercetools/platform-sdk';
import { Container, Grid, Paper, Stack, Typography, useEventCallback } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  EditableFormActionsBar,
  EditableFormViewMode,
  FormActionsToolBarProps,
} from '@components/EditableFormActionsBar/EditableFormActionsBar';

type DefaultAddressesInformationFormData = {
  defaultBillingAddressIdx: number;
  defaultShippingAddressIdx: number;
};

export interface DefaultAddressesFormComponentProps {
  userData: Customer;
  isLoading?: boolean;
  onSubmitDefaultAddresses: (data: DefaultAddressesInformationFormData) => Promise<OperationResult>;
}

export function DefaultAddressesForm({
  userData,
  isLoading = false,
  onSubmitDefaultAddresses,
}: DefaultAddressesFormComponentProps) {
  const addresses = getCustomerProfileAddresses(userData);
  const [viewMode, setViewMode] = useState<EditableFormViewMode>('view');
  const [isSaving, setIsSaving] = useState(isLoading);

  const readOnlyMode = viewMode === 'view';
  const isBusy = isLoading || isSaving;

  const formContext = useForm<DefaultAddressesInformationFormData>({
    // TODO: check if it's needed to pass real id's because in registration page we passing indexes here we should sending id's;
    defaultValues: {
      defaultBillingAddressIdx: getDefaultAddressIndex('billing', userData),
      defaultShippingAddressIdx: getDefaultAddressIndex('shipping', userData),
    },
    mode: 'all',
  });

  const { handleSubmit, reset } = formContext;

  const getShippingAddressOptions = useAddressRenderOptions('shipping');
  const getBillingAddressOptions = useAddressRenderOptions('billing');

  useEffect(() => {
    reset({
      defaultBillingAddressIdx: getDefaultAddressIndex('billing', userData),
      defaultShippingAddressIdx: getDefaultAddressIndex('shipping', userData),
    });
  }, [userData, reset]);

  const performSave = useEventCallback(async (data: DefaultAddressesInformationFormData) => {
    setIsSaving(true);
    const result = await onSubmitDefaultAddresses(data);
    setIsSaving(false);

    if (result.success) {
      setViewMode('view');
      reset();
    }
  });

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
      <Paper elevation={1} sx={{ p: '1vh 3%', width: '100%', mt: 2 }}>
        <FormProvider<DefaultAddressesInformationFormData> {...formContext}>
          <form onSubmit={handleSubmit(performSave)}>
            <Grid container item sx={{ pt: 3 }} spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1, md: 2 }} maxWidth="85vw">
              <Grid item xs={2}>
                <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="start">
                  <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                    Default addresses
                  </Typography>
                  <EditableFormActionsBar
                    mode={viewMode}
                    onAction={handleFormModeAction}
                    isLoading={isBusy}
                    disabled={isBusy}
                  />
                </Stack>
              </Grid>

              <Grid item xs={1}>
                <SelectElement<RegistrationFormData>
                  label="Default shipping address"
                  name="defaultShippingAddressIdx"
                  options={getShippingAddressOptions(addresses.addresses)}
                  helperText=" "
                  required
                  disabled={isBusy || readOnlyMode}
                  fullWidth
                />
              </Grid>
              <Grid item xs={1}>
                <SelectElement<RegistrationFormData>
                  label="Default billing address"
                  name="defaultBillingAddressIdx"
                  options={getBillingAddressOptions(addresses.addresses)}
                  helperText=" "
                  required
                  disabled={isBusy || readOnlyMode}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Paper>
    </Container>
  );
}
