import { Stack, Typography } from '@mui/material';
import styles from './DescriptionElement.module.scss';

function DescriptionElement() {
  return (
    <Stack className={styles.aboutDescription}>
      <Typography component="h1" className={styles.aboutTitle}>
        Meet our dynamic and dedicated team of developers!{' '}
      </Typography>
      <Typography component="p" className={styles.aboutText}>
        We work together seamlessly, supporting and covering for each other. Each team member has their own
        responsibilities but can always rely on the help of a colleague. Alongside us is our experienced and wonderful
        mentor, who continuously reviews our code and offers valuable feedback for improvement.
      </Typography>
    </Stack>
  );
}
export default DescriptionElement;
