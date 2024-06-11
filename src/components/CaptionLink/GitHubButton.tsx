import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';

interface GitHubButtonProps {
  url: string;
}

function GitHubButton({ url }: GitHubButtonProps) {
  return (
    <IconButton component="a" href={url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
      <GitHubIcon fontSize="large" />
    </IconButton>
  );
}

export default GitHubButton;
