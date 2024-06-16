import { Avatar, AvatarGroup } from '@mui/material';
import { teamMembersData } from '../../data/TeamMembersData';

function clampAvatars<T>(avatars: T[], options: { max?: number; total?: number } = { max: 5 }) {
  const { max = 5, total } = options;
  let clampedMax = max < 2 ? 2 : max;
  const totalAvatars = total || avatars.length;
  if (totalAvatars === clampedMax) {
    clampedMax += 1;
  }
  clampedMax = Math.min(totalAvatars + 1, clampedMax);
  const maxAvatars = Math.min(avatars.length, clampedMax - 1);
  const surplus = Math.max(totalAvatars - clampedMax, totalAvatars - maxAvatars, 0);
  return { avatars: avatars.slice(0, maxAvatars).reverse(), surplus };
}

export default function AvatarsGroup() {
  const { avatars, surplus } = clampAvatars(
    teamMembersData.map((dev) => ({
      alt: dev.name,
      src: dev.photo,
      githubUrl: dev.github,
    })),
  );

  function handleAvatarClick(url: string) {
    window.open(url, '_blank');
  }

  return (
    <AvatarGroup>
      {avatars.map((avatar) => (
        <Avatar
          key={avatar.alt}
          {...avatar}
          onClick={() => handleAvatarClick(avatar.githubUrl)}
          sx={{
            '&:hover': {
              cursor: 'pointer',
              zIndex: '10',
              boxShadow: 'rgba(0, 0, 0, 0.4) 0px 14px 28px, rgba(0, 0, 0, 0.4) 0px 10px 10px',
            },
          }}
        />
      ))}
      {!!surplus && <Avatar>+{surplus}</Avatar>}
    </AvatarGroup>
  );
}
