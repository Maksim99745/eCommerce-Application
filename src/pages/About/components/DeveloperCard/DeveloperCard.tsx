import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import GitHubButton from '@components/CaptionLink/GitHubButton';
import { Link } from 'react-router-dom';

interface TeamMembersData {
  name: string;
  role: string;
  info: string;
  github: string;
  photo: string;
}

export default function DeveloperCard({ name, role, info, github, photo }: TeamMembersData) {
  return (
    <Card
      sx={{
        width: { md: '48%', sm: '100%' },
        height: '650px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        pb: '7px',
      }}
    >
      <CardActionArea LinkComponent="a" href={github} target="_blank" rel="noopener noreferrer">
        <CardMedia component="img" height="250" image={photo} alt="Developer photo" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: '500' }}>
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="p"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {role}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '9',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {info}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          component={Link}
          to={github}
          size="small"
          color="inherit"
          variant="outlined"
          sx={{ textTransform: 'none' }}
        >
          Get to know more <GitHubButton url={github} />
        </Button>
      </CardActions>
    </Card>
  );
}
