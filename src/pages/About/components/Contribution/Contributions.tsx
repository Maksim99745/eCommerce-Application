import { Avatar, Container, Paper, Typography } from '@mui/material';
import { teamMembersData } from '../../../../data/TeamMembersData';
import styles from './Contributions.module.scss';

function ContributionBlock() {
  return (
    <Container component="section" className={styles.contributionSection}>
      <Typography gutterBottom variant="h2" className={styles.contributionSectionTitle}>
        Each member&apos;s contributions to the project
      </Typography>
      <Container className={styles.contributionWrap}>
        {teamMembersData.map((member) => (
          <Paper key={`contribution${member.id}`} elevation={16} className={styles.contributionItem}>
            <Typography variant="h5" className={styles.contributionTitle}>
              <Avatar alt="Developer avatar" src={member.photo} sx={{ width: 60, height: 60, mr: '20px' }} />
              {member.name}
            </Typography>
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '20',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {member.contribution}
            </Typography>
          </Paper>
        ))}
      </Container>
    </Container>
  );
}
export default ContributionBlock;
