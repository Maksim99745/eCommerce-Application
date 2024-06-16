import { Avatar, AvatarGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { teamMembersData } from '../../data/TeamMembersData';
import styles from './AvatarGroup.module.scss';

export default function AvatarsGroup() {
  const avatars = teamMembersData.map((dev) => ({
    alt: dev.name,
    src: dev.photo,
    github: dev.github,
  }));

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
