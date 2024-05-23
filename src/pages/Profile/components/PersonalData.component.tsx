import { Customer } from '@commercetools/platform-sdk';
import { DatePickerElement } from '@components/DataPickerElement/DatePickerElement';
import { personalInformationSchema } from '@core/validation/user-profile/user-profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInformationForm } from '@models/forms.model';
import { LoadingButton } from '@mui/lab';
import { Container, Grid, Paper, Typography, useEventCallback } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { useState } from 'react';
import { EditableFormViewMode, FormActionsToolBar, FormActionsToolBarProps } from './FormActionsToolBar';

export interface PersonalFormComponentProps {
  onSubmit: (personalData: PersonalInformationForm) => void;
  isLoading?: boolean;
  userData: Customer;
}

function PersonalFormComponent({ userData, isLoading, onSubmit }: PersonalFormComponentProps) {
  const [viewMode, setViewMode] = useState<EditableFormViewMode>('view');
  const { firstName = '', lastName = '', dateOfBirth = undefined } = userData;

  const formContext = useForm<PersonalInformationForm>({
    defaultValues: {
      firstName,
      lastName,
      dateOfBirth,
    },
    resolver: zodResolver(personalInformationSchema),
    mode: 'all',
  });
  const handleFormModeAction = useEventCallback<FormActionsToolBarProps['onAction']>((action) => {
    console.log('handleFormModeAction', action);
    if (action === 'edit') {
      setViewMode('edit');
    } else if (action === 'cancel') {
      setViewMode('view');
      // TODO: reset form
    }
  });
  // TODO: think about birthday validation, date from commerce tools is not appropriate for validation, that's why i changed mode to onChange
  return (
    <Container maxWidth="md">
      <Paper elevation={1} sx={{ p: '1vh 2%', width: '100%', mb: 2 }}>
        <FormContainer<PersonalInformationForm> formContext={formContext} onSuccess={onSubmit}>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Personal information
          </Typography>
          <FormActionsToolBar mode={viewMode} onAction={handleFormModeAction} />
          <Grid container spacing={{ xs: 2 }} columns={{ xs: 1, md: 3 }}>
            <Grid item xs={1}>
              <TextFieldElement<PersonalInformationForm>
                label="First name"
                name="firstName"
                helperText=" "
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={1}>
              <TextFieldElement<PersonalInformationForm>
                label="Last name"
                name="lastName"
                helperText=" "
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePickerElement
                  label="Birth date"
                  name="dateOfBirth"
                  helperText=" "
                  // TODO: убери реад онлу
                  // readOnly
                  // onChange={(value) => console.log(value)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={1}>
              <LoadingButton
                loading={isLoading}
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mx: 'auto', textTransform: 'none' }}
                disabled={isLoading}
                size="large"
              >
                <HowToRegOutlinedIcon sx={{ mr: 1 }} />
                Sign Up
              </LoadingButton>
            </Grid>
          </Grid>
        </FormContainer>
      </Paper>
    </Container>
  );
}

export default PersonalFormComponent;
