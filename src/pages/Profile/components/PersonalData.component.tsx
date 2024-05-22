import { personalInformationSchema } from '@core/validation/personal-information/personal-information.chema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInformationForm } from '@models/personal-data.model';
import { Container, Grid, Paper, Typography } from '@mui/material';
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
      birthDate: dateOfBirth,
    },
    resolver: zodResolver(personalInformationSchema),
    mode: 'onChange',
  });
  // TODO: think about birthday validation, date from commerce tools is not appropriate for validation, that's why i changed mode to onChange
  return (
    <Container maxWidth="md">
      <Paper elevation={1} sx={{ p: '1vh 2%', width: '100%', m: 1 }}>
        <FormContainer<PersonalInformationForm> formContext={formContext}>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Personal information
          </Typography>
          <Grid container spacing={{ xs: 2 }} columns={{ xs: 1, md: 3 }}>
            <Grid item xs={1}>
              <TextFieldElement<PersonalInformationForm>
                label="First name"
                name="firstName"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={1}>
              <TextFieldElement<PersonalInformationForm>
                label="Last name"
                name="lastName"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item>
              <TextFieldElement<PersonalInformationForm>
                label="Birth date"
                name="birthDate"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </FormContainer>
      </Paper>
    </Container>
  );
}

export default PersonalData;
