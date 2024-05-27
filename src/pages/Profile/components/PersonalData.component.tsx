import { Customer } from '@commercetools/platform-sdk';
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { personalInformationSchema } from '@core/validation/user-profile/user-profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInformationForm } from '@models/forms.model';
import { Container, Grid, Paper, Stack, Typography, useEventCallback } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormProvider, TextFieldElement, useForm } from 'react-hook-form-mui';
import { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  EditableFormActionsBar,
  EditableFormViewMode,
  FormActionsToolBarProps,
} from '@components/EditableFormActionsBar/EditableFormActionsBar';

export interface PersonalFormComponentProps {
  onSubmit: (personalData: PersonalInformationForm) => Promise<{ success: true } | { success: false; error: Error }>;
  isLoading?: boolean;
  userData: Customer;
}

dayjs.extend(utc);

function PersonalFormComponent({ userData, isLoading, onSubmit }: PersonalFormComponentProps) {
  const [viewMode, setViewMode] = useState<EditableFormViewMode>('view');
  const [isSaving, setIsSaving] = useState(isLoading);

  const isBusy = isLoading || isSaving;
  const readOnlyMode = viewMode === 'view';

  const { firstName = '', lastName = '', dateOfBirth = undefined, email = '' } = userData;

  const formContext = useForm<PersonalInformationForm>({
    defaultValues: {
      firstName,
      lastName,
      dateOfBirth: dayjs.utc(dateOfBirth).toISOString(),
      email,
    },
    resolver: zodResolver(personalInformationSchema),
    mode: 'all',
  });

  const { handleSubmit, reset } = formContext;

  const performSave = useEventCallback(async (data: PersonalInformationForm) => {
    setIsSaving(true);
    const result = await onSubmit(data);
    setIsSaving(false);

    if (result.success) {
      setViewMode('view');
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
      <Paper elevation={1} sx={{ p: '1vh 2%', width: '100%', mb: 2 }}>
        <FormProvider<PersonalInformationForm> {...formContext}>
          <form onSubmit={handleSubmit(performSave)}>
            <Stack direction="row" spacing="auto" sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Personal information
              </Typography>
              <EditableFormActionsBar
                mode={viewMode}
                onAction={handleFormModeAction}
                isLoading={isBusy}
                disabled={isBusy}
              />
            </Stack>
            <Grid container spacing={{ xs: 1 }} columns={{ xs: 1, md: 2 }}>
              <Grid item xs={1}>
                <TextFieldElement<PersonalInformationForm>
                  label="First name"
                  name="firstName"
                  helperText={' '}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={isBusy}
                  InputProps={{
                    readOnly: readOnlyMode,
                  }}
                />
              </Grid>

              <Grid item xs={1}>
                <TextFieldElement<PersonalInformationForm>
                  label="Last name"
                  name="lastName"
                  helperText=" "
                  disabled={isBusy}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: readOnlyMode,
                  }}
                />
              </Grid>

              <Grid item xs={1}>
                <TextFieldElement<PersonalInformationForm>
                  label="Email"
                  name="email"
                  helperText=" "
                  disabled={isBusy}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: readOnlyMode,
                  }}
                />
              </Grid>

              <Grid item xs={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePickerElement
                    label="Birth date"
                    name="dateOfBirth"
                    helperText=" "
                    disabled={isBusy}
                    readOnly={readOnlyMode}
                    inputProps={{ fullWidth: true }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Paper>
    </Container>
  );
}

export default PersonalFormComponent;
