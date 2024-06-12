import { Box, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

interface Rsschool {
  youtube: string;
  github: string;
  discord: string;
}

export default function SocialIconsGroup({ youtube, github, discord }: Rsschool) {
  return (
    <Box>
      <Button component={Link} to={youtube} color="inherit" variant="text" target="_blank" rel="noopener noreferrer">
        <YouTubeIcon fontSize="large" />
      </Button>

      <Button component={Link} to={github} color="inherit" variant="text" target="_blank" rel="noopener noreferrer">
        <GitHubIcon fontSize="large" />
      </Button>

      <Button component={Link} to={discord} color="inherit" variant="text" target="_blank" rel="noopener noreferrer">
        <img src="discord.svg" alt="discord icon" width={35} height={35} />
      </Button>
    </Box>
  );
}
