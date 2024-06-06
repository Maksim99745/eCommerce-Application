import useAuth from '@core/api/hooks/useAuth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import {
  Button,
  Divider,
  ListItemIcon,
  MenuItem,
  Typography,
  useEventCallback,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShowMessage } from '@hooks/useShowMessage';

interface HeaderAction {
  key: string;
  to: string;
  startIcon: ReactNode;
  text: string;
  onAction: () => void;
  buttonStyle: object;
  menuItemStyle: object;
  show: boolean;
}

const actionStyles = {
  button: { textTransform: 'none', color: 'inherit', borderColor: 'inherit' },
  showAfterSm: { display: { xs: 'none', sm: 'flex' } },
  showAfterMd: { display: { xs: 'none', sm: 'none', md: 'flex' } },
};

export const useHeaderActions = (onClick: () => void): { buttonItems: ReactNode; menuItems: ReactNode } => {
  const navigate = useNavigate();
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down('sm'));
  const handleOnClick = useEventCallback(onClick);
  const showMessage = useShowMessage();

  const { user, hasUser, logout } = useAuth();

  const handlerLogout = useEventCallback(() => {
    handleOnClick();
    showMessage(`Dear ${user?.firstName} ${user?.lastName}, see you next time!`);
    logout();
    navigate('/');
  });

  const actions = useMemo(
    () =>
      [
        {
          key: 'profile',
          to: '/profile',
          startIcon: <AccountCircleIcon />,
          text: 'Profile',
          onAction: handleOnClick,
          buttonStyle: { display: 'none' },
          menuItemStyle: {},
          show: hasUser,
        },
        {
          key: 'logout',
          to: '',
          startIcon: <LogoutIcon />,
          text: 'Sign Out',
          onAction: handlerLogout,
          buttonStyle: { display: 'none' },
          menuItemStyle: {},
          show: hasUser,
        },
        {
          key: 'login',
          to: '/login',
          startIcon: <ExitToAppIcon />,
          text: 'Sign In',
          onAction: handleOnClick,
          buttonStyle: { display: 'none' },
          menuItemStyle: {},
          show: !user,
        },
        {
          key: 'registration',
          to: '/registration',
          startIcon: <HowToRegIcon />,
          text: 'Sign Up',
          onAction: handleOnClick,
          buttonStyle: { display: 'none' },
          menuItemStyle: {},
          show: !user,
        },
        {
          key: 'about',
          to: '/about',
          startIcon: <InfoIcon />,
          text: 'About',
          onAction: handleOnClick,
          buttonStyle: { ...actionStyles.button, ...actionStyles.showAfterSm },
          menuItemStyle: { display: { sm: 'none' } },
          show: true,
        },
      ] satisfies HeaderAction[],
    [handleOnClick, hasUser, user, handlerLogout],
  );

  const buttonItems = useMemo<ReactNode>(
    () => (
      <>
        <Button
          sx={{ borderRadius: 4, textTransform: 'none', display: { xs: 'none', sm: 'none', md: 'flex' } }}
          component={Link}
          to="/catalog"
          size="medium"
          variant="contained"
          startIcon={<InventoryIcon />}
        >
          <Typography variant="h6" noWrap sx={{ fontSize: '16px' }}>
            Catalog
          </Typography>
        </Button>

        <Button
          key="about"
          component={Link}
          to="/about"
          sx={{ ...actionStyles.button, ...actionStyles.showAfterSm }}
          onClick={handleOnClick}
          startIcon={<InfoIcon />}
          variant="text"
        >
          About
        </Button>
      </>
    ),
    [handleOnClick],
  );

  const menuItems = useMemo<ReactNode>(() => {
    const items = actions
      .filter(({ show }) => show)
      .map(({ key, to, startIcon, text, onAction, menuItemStyle }) => (
        <MenuItem key={key} component={to ? Link : 'button'} to={to} sx={menuItemStyle} onClick={onAction}>
          <ListItemIcon>{startIcon}</ListItemIcon>
          {text}
        </MenuItem>
      ));

    if (lessThanSm) {
      items.splice(-1, 0, <Divider key="divider" />);
    }

    return items;
  }, [actions, lessThanSm]);

  return { buttonItems, menuItems };
};
