import { Container, Stack } from '@mui/material';
import AboutImagesContainer from './components/ImagesBlockElement/AboutImagesBlock';
import DescriptionElement from './components/DescriptionElement/DescriptionElement';
import TeamMembersBlock from './components/TeamMembersBlock/TeamMembersBlock';

function AboutPage() {
  return (
    <Stack>
      <Container
        component="section"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { lg: 'row', md: 'row', sm: 'column-reverse', xs: 'column-reverse' },
          pt: '35px',
          mb: { lg: '45px', sm: '25px', xs: '15px' },
          mt: { sm: '25px', xs: '25px' },
          gap: '4%',
        }}
      >
        <DescriptionElement />
        <AboutImagesContainer />
      </Container>
      <TeamMembersBlock />
    </Stack>
  );
}

export default AboutPage;
