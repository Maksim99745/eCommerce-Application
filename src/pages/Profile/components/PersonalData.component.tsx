import { Customer } from '@commercetools/platform-sdk';
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { personalInformationSchema } from '@core/validation/user-profile/user-profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInformationFormData } from '@models/forms.model';
import { Container, Grid, Paper, Stack, Typography, useEventCallback } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormProvider, TextFieldElement, useForm } from 'react-hook-form-mui';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  EditableFormActionsBar,
  FormActionsToolBarProps,
} from '@components/EditableFormActionsBar/EditableFormActionsBar';
import { useEditableFormState } from '@components/EditableFormActionsBar/useEditableFormState';
import { OperationResult } from '@models/index';

export interface PersonalFormComponentProps {
  onSubmit: (personalData: PersonalInformationFormData) => Promise<OperationResult>;
  isLoading?: boolean;
  userData: Customer;
}

const getPersonalFormData = (userData: Customer): PersonalInformationFormData => {
  const formValues: PersonalInformationFormData = {
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    dateOfBirth: dayjs.utc(userData.dateOfBirth).toISOString() || '',
    email: userData.email || '',
  };
  return formValues;
};

dayjs.extend(utc);

function PersonalFormComponent({ userData, isLoading = false, onSubmit }: PersonalFormComponentProps) {
  const { isBusy, isReadonly, viewMode, setViewMode, setIsSaving } = useEditableFormState({ isLoading });

  const { firstName = '', lastName = '', dateOfBirth = undefined, email = '' } = userData;

  const formContext = useForm<PersonalInformationFormData>({
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

  const performSave = useEventCallback(async (data: PersonalInformationFormData) => {
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
      reset(getPersonalFormData(userData));
    }
  });

  return (
    <Container maxWidth="md">
      <Paper elevation={1} sx={{ p: '1vh 2%', width: '100%', mb: 2 }}>
        <FormProvider<PersonalInformationFormData> {...formContext}>
          <form onSubmit={handleSubmit(performSave)} noValidate>
            <Stack direction="row" spacing="auto" sx={{ mb: 3 }} alignItems="start">
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
                <TextFieldElement<PersonalInformationFormData>
                  label="First name"
                  name="firstName"
                  helperText={' '}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={isBusy}
                  InputProps={{
                    readOnly: isReadonly,
                  }}
                />
              </Grid>

              <Grid item xs={1}>
                <TextFieldElement<PersonalInformationFormData>
                  label="Last name"
                  name="lastName"
                  helperText=" "
                  disabled={isBusy}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: isReadonly,
                  }}
                />
              </Grid>

              <Grid item xs={1}>
                <TextFieldElement<PersonalInformationFormData>
                  label="Email"
                  name="email"
                  helperText=" "
                  disabled={isBusy}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: isReadonly,
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
                    readOnly={isReadonly}
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
