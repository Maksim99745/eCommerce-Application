import { DatePickerElement } from '@components/DataPickerElement/DatePickerElement';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInformationForm, personalInformationSchema } from '@models/forms.model';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';

export interface PersonalDataProps {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

function PersonalData({ firstName, lastName, dateOfBirth }: PersonalDataProps) {
  const formContext = useForm<PersonalInformationForm>({
    defaultValues: {
      firstName,
      lastName,
      birthDate: new Date(dateOfBirth).toISOString(),
    },
    resolver: zodResolver(personalInformationSchema),
    mode: 'all',
  });

  // TODO: think about birthday validation, date from commerce tools is not appropriate for validation, that's why i changed mode to onChange
  return (
    <Container maxWidth="md">
      <Paper elevation={1} sx={{ p: '1vh 2%', width: '100%', mb: 2 }}>
        <FormContainer<PersonalInformationForm> formContext={formContext}>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Personal information
          </Typography>
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
                  name="birthDate"
                  helperText=" "
                  // onChange={(value) => console.log(value)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </FormContainer>
      </Paper>
    </Container>
  );
}

export default PersonalData;
