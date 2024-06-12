import { Avatar, Container, Paper, Stack, Typography } from '@mui/material';
import { methodologiesData } from './methodologyData';
import styles from './Methodology.module.scss';

function MethodologySection() {
  return (
    <Container component="section" className={styles.methodologySection}>
      <Typography gutterBottom variant="h2" className={styles.methodologySectionTitle}>
        Effective Collaboration: Our Path to Success
      </Typography>
      <Container>
        <Paper elevation={16} className={styles.methodologySectionDescription}>
          Our team&apos;s dedication to effective collaboration and agile methodologies was key to the successful
          completion of our project. We embraced a range of tools and practices to ensure seamless communication,
          efficient workflow, and continuous improvement. This structured and collaborative approach enabled us to
          overcome challenges, adapt to changes, and deliver a successful project that met all our goals. Our commitment
          to agile principles and effective communication was the cornerstone of our success.
        </Paper>
      </Container>

      <Container className={styles.methodologyWrap}>
        {methodologiesData.map((item) => (
          <Paper
            key={`contribution${item.id}`}
            elevation={16}
            className={styles.methodologyItem}
            sx={{ width: { lg: '30', md: '48%', sm: '100%' } }}
          >
            <Stack className={styles.methodologyTitleWrap}>
              <Avatar className={styles.methodologyAvatar} variant="rounded" alt="Developer avatar" src={item.img} />
              <Typography variant="h5" className={styles.methodologyTitle}>
                {item.name}
              </Typography>
            </Stack>

            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '7',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {item.info}
            </Typography>
          </Paper>
        ))}
      </Container>
    </Container>
  );
}
export default MethodologySection;
