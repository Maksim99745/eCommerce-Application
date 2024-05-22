import { Container, Paper, Typography } from '@mui/material';

export interface PersonalDataProps {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

function PersonalData({ firstName, lastName, dateOfBirth }: PersonalDataProps) {
  return (
    <Paper elevation={1} sx={{ p: '1vh 2%', maxWidth: '900px', width: '100%' }}>
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Personal information
        </Typography>
        <Typography variant="body1" gutterBottom>
          First name: {firstName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Last name: {lastName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Birth date: {dateOfBirth}
        </Typography>
      </Container>
    </Paper>
  );
}

export default PersonalData;
