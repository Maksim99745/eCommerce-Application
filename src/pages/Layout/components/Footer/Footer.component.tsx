import AvatarsGroup from '@components/AvatarGroup/AvatarGroup';
import SocialIconsGroup from '@components/SocialIconsGroup/SocialIconsGroup';
import { Toolbar, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function FooterComponent() {
  const rsschool = {
    link: 'https://rs.school/',
    youtube: 'https://www.youtube.com/c/RollingScopesSchool',
    github: 'https://github.com/rolling-scopes/rsschool-app',
    discord: 'https://discord.com/invite/PRADsJB',
  };
  return (
    <Toolbar
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 'auto',
        right: 0,
        backgroundColor: '#1976d2',
        color: '#fff',
        p: 1,
        justifyItems: 'center',
        boxShadow: 3,
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <AvatarsGroup />
        <Button
          component={Link}
          to={rsschool.link}
          size="small"
          color="inherit"
          variant="outlined"
          sx={{ boxShadow: 5 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="rsschool.png" alt="rs school logo" width={100} />
        </Button>
        <SocialIconsGroup github={rsschool.github} youtube={rsschool.youtube} discord={rsschool.discord} />
      </Container>
    </Toolbar>
  );
}

export default FooterComponent;
