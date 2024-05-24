import { HideOnPathsComponent } from '@components/HideOnRoot/HideOnPaths.component';
import HomeIcon from '@mui/icons-material/Home';
import { Breadcrumbs, Chip, ChipProps, emphasize, styled, Toolbar, Typography } from '@mui/material';
import { ElementType } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

const hideBreadcrumbsPaths = ['/', '/login', '/registration', '/profile', '/about', '/cart'];
const excludePaths = ['products', 'categories'];
const breadcrumbSpacing = 3;
const hoverCoefficient = 0.06;
const activeCoefficient = 0.06;

const StyledBreadcrumb = styled(Chip)<ChipProps & { component: ElementType } & LinkProps>(({ theme }) => {
  const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];

  return {
    backgroundColor,
    height: theme.spacing(breadcrumbSpacing),
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
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <HideOnPathsComponent paths={hideBreadcrumbsPaths}>
      <Toolbar
        sx={{
          minHeight: { xs: 40 },
          backgroundColor: 'primary.light',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb component={Link} label="Home" to="/" icon={<HomeIcon />} />

          {paths.map((path, index) => {
            if (excludePaths.includes(path)) {
              return null;
            }

            const last = index === paths.length - 1;

            return last ? (
              <Typography color="text.secondary" key={path}>
                {path}
              </Typography>
            ) : (
              <StyledBreadcrumb
                component={Link}
                key={path}
                label={path}
                to={`/${paths.slice(0, index + 1).join('/')}`}
              />
            );
          })}
        </Breadcrumbs>
      </Toolbar>
    </HideOnPathsComponent>
  );
}
