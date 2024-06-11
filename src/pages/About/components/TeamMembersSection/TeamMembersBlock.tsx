import { Container, Typography } from '@mui/material';
import DeveloperCard from '../DeveloperCard/DeveloperCard';
import { teamMembersData } from './TeamMembersData';
import styles from './TeamMembersBlock.module.scss';

function TeamMembersSection() {
  return (
    <Container component="section" className={styles.teamMembersSection}>
      <Typography gutterBottom variant="h2" className={styles.teamMembersTitle}>
        Our Team of Passionate and Enthusiastic Developers Who Live and Breathe Code
      </Typography>
      <Container className={styles.teamMembersWrap}>
        {teamMembersData.map((member) => (
          <DeveloperCard
            key={member.id}
            photo={member.photo}
            name={member.name}
            role={member.role}
            info={member.info}
            github={member.github}
          />
        ))}
      </Container>
    </Container>
  );
}
export default TeamMembersSection;
