import { Container, Stack } from '@mui/material';
import AboutImagesContainer from './components/ImagesBlockElement/AboutImagesBlock';
import DescriptionElement from './components/DescriptionElement/DescriptionElement';
import TeamMembersSection from './components/TeamMembersSection/TeamMembersBlock';
import ContributionBlock from './components/Contribution/Contributions';
import MethodologySection from './components/Methodology/Methodology';

function AboutPage() {
  return (
    <Stack
      sx={{
        background: {
          md: 'url(rs.webp) 100% 100%/ 100px 100px no-repeat, url(rs1.webp) 49% 100.5%/ 150px 150px no-repeat',
          xs: 'url(rs.webp) 100% 100%/ 100px 100px no-repeat',
        },
        pb: '70px',
      }}
    >
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
