import { HideOnPathsComponent } from '@components/HideOnPaths/HideOnPaths.component';
import { useBreadcrumbs } from '@hooks/useBreadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import { Breadcrumbs, Chip, ChipProps, CircularProgress, emphasize, styled, Toolbar, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { ElementType } from 'react';
import { Link, LinkProps } from 'react-router-dom';

const hideBreadcrumbsPaths = ['/', '/login', '/registration', '/profile', '/about', '/cart'];
const breadcrumbSpacing = 3;
const hoverCoefficient = 0.06;
const activeCoefficient = 0.06;

const StyledBreadcrumb = styled(Chip)<ChipProps & { component: ElementType } & LinkProps>(({ theme }) => {
  const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];

  return {
    backgroundColor,
    height: theme.spacing(breadcrumbSpacing),
    maxWidth: '200px',
    textOverflow: 'ellipsis',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, hoverCoefficient),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, activeCoefficient),
    },
    cursor: 'pointer',
    textTransform: 'capitalize',
  };
});

export default function BreadcrumbsComponent() {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <HideOnPathsComponent paths={hideBreadcrumbsPaths}>
      <Toolbar
        sx={{
          minHeight: { xs: 'auto' },
          backgroundColor: blue[200],
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          p: 1,
        }}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ '.MuiBreadcrumbs-ol': { rowGap: '5px' }, '.MuiBreadcrumbs-li': { display: 'flex' } }}
        >
          <StyledBreadcrumb component={Link} label="Home" to="/" icon={<HomeIcon />} />

          {breadcrumbs.map(({ label, to, isLast }) => {
            if (label === '...') {
              return <CircularProgress key={label} size={20} thickness={5} color="secondary" />;
            }

            if (isLast) {
              return (
                <Typography
                  color="text.secondary"
                  key={label}
                  sx={{ maxWidth: 200, textOverflow: 'ellipsis', textWrap: 'nowrap', overflow: 'hidden' }}
                >
                  {label}
                </Typography>
              );
            }

            return <StyledBreadcrumb component={Link} key={label} label={label} to={to} />;
          })}
        </Breadcrumbs>
      </Toolbar>
    </HideOnPathsComponent>
  );
}
