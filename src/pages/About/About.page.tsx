import { Container, Stack } from '@mui/material';
import AboutImagesContainer from './components/ImagesBlockElement/AboutImagesBlock';
import DescriptionElement from './components/DescriptionElement/DescriptionElement';
import TeamMembersSection from './components/TeamMembersSection/TeamMembersBlock';
import ContributionBlock from './components/Contribution/Contributions';
import MethodologySection from './components/Methodology/Methodology';

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
          mb: { lg: '80px', sm: '30px', xs: '20px' },
          mt: { sm: '25px', xs: '25px' },
          gap: '4%',
        }}
      >
        <DescriptionElement />
        <AboutImagesContainer />
      </Container>
      <TeamMembersSection />
      <ContributionBlock />
      <MethodologySection />
    </Stack>
  );
}

export default AboutPage;
