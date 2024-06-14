import AvatarsGroup from '@components/AvatarGroup/AvatarGroup';
import SocialIconsGroup from '@components/SocialIconsGroup/SocialIconsGroup';
import { Toolbar, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { rsschool } from '@constants/rsSchoolLinks';
import styles from './Footer.component.module.scss';

function FooterComponent() {
  return (
    <Toolbar
      className={styles.footer}
      component="footer"
      sx={{
        position: 'fixed',
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
          className={styles.rsLogoWrap}
          component={Link}
          to={rsschool.link}
          size="small"
          color="inherit"
          variant="outlined"
          sx={{ boxShadow: 5 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={rsschool.rsLogoUrl} alt="rs school logo" />
        </Button>
        <SocialIconsGroup
          github={rsschool.github}
          youtube={rsschool.youtube}
          discord={rsschool.discord}
          discordIconUrl={rsschool.discordIconUrl}
        />
      </Container>
    </Toolbar>
  );
}

export default FooterComponent;
