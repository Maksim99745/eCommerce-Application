import { HideOnPathsComponent } from '@components/HideOnPaths/HideOnPaths.component';
import useCategory from '@hooks/useCategory';
import useProduct from '@hooks/useProduct';
import HomeIcon from '@mui/icons-material/Home';
import { Breadcrumbs, Chip, ChipProps, CircularProgress, emphasize, styled, Toolbar, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { ElementType } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

interface Breadcrumb {
  label: string;
  to: string;
  isLast?: boolean;
}

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
  const location = useLocation();
  const { category } = useCategory();
  const { product, isProductLoading } = useProduct();
  const paths = location.pathname.split('/');

  const breadcrumbs: Breadcrumb[] = [];

  for (let i = 0; i < paths.length; i += 1) {
    const breadcrumb: Breadcrumb = {
      label: paths[i],
      to: '/',
    };

    if (paths[i] === 'categories') {
      breadcrumb.label = category?.name.en || '...';
      i += 1;
    }

    if (paths[i] === 'products') {
      breadcrumb.label = isProductLoading || !product?.name.en ? '...' : product.name.en;
      i += 1;
    }

    breadcrumb.to = paths.slice(0, i + 1).join('/');
    breadcrumb.isLast = i === paths.length - 1;

    if (breadcrumb.label !== '') {
      breadcrumbs.push(breadcrumb);
    }
  }

  return (
    <HideOnPathsComponent paths={hideBreadcrumbsPaths}>
      <Toolbar
        sx={{
          minHeight: { xs: 40 },
          backgroundColor: blue[200],
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb component={Link} label="Home" to="/" icon={<HomeIcon />} />

          {breadcrumbs.map(({ label, to, isLast }) => {
            if (label === '...') {
              return <CircularProgress key={label} size={20} thickness={5} color="secondary" />;
            }

            if (isLast) {
              return (
                <Typography color="text.secondary" key={label}>
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
