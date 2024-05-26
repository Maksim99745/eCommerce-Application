import { Customer } from '@commercetools/platform-sdk';
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { personalInformationSchema } from '@core/validation/user-profile/user-profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInformationForm } from '@models/forms.model';
import { Container, Grid, Paper, Stack, Typography, useEventCallback } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';
import { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  EditableFormActionsBar,
  EditableFormViewMode,
  FormActionsToolBarProps,
} from '../../../components/EditableFormActionsBar/EditableFormActionsBar';

export interface PersonalFormComponentProps {
  onSubmit: (personalData: PersonalInformationForm) => void;
  isLoading?: boolean;
  userData: Customer;
}

function PersonalFormComponent({ userData, isLoading, onSubmit }: PersonalFormComponentProps) {
  const [viewMode, setViewMode] = useState<EditableFormViewMode>('view');
  const [readOnlyMode, setReadOnlyMode] = useState<boolean>(true);

  const { firstName = '', lastName = '', dateOfBirth = undefined } = userData;

  dayjs.extend(utc);

  const formContext = useForm<PersonalInformationForm>({
    defaultValues: {
      firstName,
      lastName,
      dateOfBirth: dayjs.utc(dateOfBirth).toISOString(),
    },
    resolver: zodResolver(personalInformationSchema),
    mode: 'all',
  });

  const { handleSubmit, reset } = formContext;

  const handleFormModeAction = useEventCallback<FormActionsToolBarProps['onAction']>((action) => {
    if (action === 'edit') {
      setViewMode('edit');
      setReadOnlyMode(false);
    } else if (action === 'cancel') {
      setViewMode('view');
      setReadOnlyMode(true);
      reset();
    } else if (action === 'save') {
      handleSubmit((data: PersonalInformationForm) => {
        onSubmit(data);
        setReadOnlyMode(true);
        setViewMode('view');
      })();
    }
  });

  return (
    <Container maxWidth="md">
      <Paper elevation={1} sx={{ p: '1vh 2%', width: '100%', mb: 2 }}>
        <FormContainer<PersonalInformationForm> formContext={formContext} onSuccess={onSubmit}>
          <Stack direction="row" spacing="auto" sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Personal information
            </Typography>
            <EditableFormActionsBar mode={viewMode} onAction={handleFormModeAction} />
          </Stack>
          <Grid container spacing={{ xs: 1 }} columns={{ xs: 1, md: 3 }}>
            <Grid item xs={1}>
              <TextFieldElement<PersonalInformationForm>
                label="First name"
                name="firstName"
                helperText=" "
                InputLabelProps={{ shrink: true }}
                disabled={isLoading}
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
                disabled={isLoading}
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
                  disabled={isLoading}
                  readOnly={readOnlyMode}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </FormContainer>
      </Paper>
    </Container>
  );
}

export default PersonalFormComponent;
