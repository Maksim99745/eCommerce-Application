import { Avatar, AvatarGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { teamMembersData } from '../../data/TeamMembersData';
import styles from './AvatarGroup.module.scss';

const avatars = teamMembersData.map((dev) => ({
  alt: dev.name,
  src: dev.photo,
  github: dev.github,
}));

export default function AvatarsGroup() {
  return (
    <AvatarGroup>
      {avatars.map((avatar) => (
        <Link
          key={avatar.alt}
          to={avatar.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.avatarLink}
        >
          <Avatar key={avatar.alt} {...avatar} />
        </Link>
      ))}
    </AvatarGroup>
  );
}
