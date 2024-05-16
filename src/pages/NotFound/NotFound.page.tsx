import { Button, Typography, Paper, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import styles from './NotFound.page.module.scss';

function NotFoundPage() {
  return (
    <Box className={styles.errorPageContainer}>
      <Paper className={styles.errorPagePaper} elevation={3}>
        <Box className={styles.errorPageContent} sx={{ fontFamily: 'Montserrat, sans-serif' }}>
          <Typography
            variant="h2"
            className={styles.errorPageTextBg}
            sx={{ fontWeight: '900', fontSize: '11vw', fontFamily: 'inherit' }}
          >
            Oops!
          </Typography>
          <Typography
            variant="h5"
            component="h1"
            className={styles.errorPageTextBg}
            align="center"
            sx={{ fontWeight: '700' }}
          >
            404 - Page not found
          </Typography>
          <Typography variant="h6" align="center" className={`${styles.errorPageTextBg} ${styles.errorPageText}`}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            className={styles.homeButton}
            sx={{ textTransform: 'none' }}
          >
            Go back to Home page
            <Box className={styles.iconWrap} component="span">
              <HomeIcon />
            </Box>
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default NotFoundPage;
