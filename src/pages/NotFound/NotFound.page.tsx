// import './index.scss';
import { Button, Typography, Paper, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box className="error-page-container">
      <Paper className="error-page-paper" elevation={3}>
        <Box className="error-page-content" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
          <Typography
            variant="h2"
            className="error-page-text-bg"
            sx={{ fontWeight: '900', fontSize: '11vw', fontFamily: 'inherit' }}
          >
            Oops!
          </Typography>
          <Typography
            variant="h5"
            component="h1"
            className="error-page-text-bg"
            align="center"
            sx={{ fontWeight: '700' }}
          >
            404 - Page not found
          </Typography>
          <Typography variant="h6" align="center" className="error-page-text-bg  error-page-text">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Button
            variant="contained"
            className="home-button"
            sx={{ textTransform: 'none' }}
            onClick={() => {
              navigate('/');
            }}
          >
            Go back to Home page
            <Box className="icon-wrap" component="span">
              <HomeIcon />
            </Box>
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default NotFoundPage;
