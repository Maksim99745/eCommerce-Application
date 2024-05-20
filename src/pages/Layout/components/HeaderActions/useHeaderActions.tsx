import { UserService } from '@core/api/user.service';
import { userLoadingSignal, userSignal } from '@core/signals/user.signal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Divider, ListItemIcon, MenuItem, useEventCallback, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

  const handlerLogout = useEventCallback(() => {
    handleOnClick();
    UserService.logout();
    navigate('/');
  });

  const hasUser = !userLoadingSignal.value && !!userSignal.value;

  const actions = useMemo(
    () =>
      [
        {
          key: 'profile',
          to: '/profile',
          startIcon: <AccountCircleIcon />,
          text: 'Profile',
          onAction: handleOnClick,
          buttonStyle: { ...actionStyles.button, ...actionStyles.showAfterMd },
          menuItemStyle: {},
          show: hasUser,
        },
        {
          key: 'logout',
          to: '',
          startIcon: <LogoutIcon />,
          text: 'Sign Out',
          onAction: handlerLogout,
          buttonStyle: { ...actionStyles.button, ...actionStyles.showAfterMd },
          menuItemStyle: {},
          show: hasUser,
        },
        {
          key: 'login',
          to: '/login',
          startIcon: <ExitToAppIcon />,
          text: 'Sign In',
          onAction: handleOnClick,
          buttonStyle: { ...actionStyles.button, ...actionStyles.showAfterSm },
          menuItemStyle: { display: { sm: 'none' } },
          show: true,
        },
        {
          key: 'registration',
          to: '/registration',
          startIcon: <HowToRegIcon />,
          text: 'Sign Up',
          onAction: handleOnClick,
          buttonStyle: { ...actionStyles.button, ...actionStyles.showAfterSm },
          menuItemStyle: { display: { sm: 'none' } },
          show: true,
        },
      ] satisfies HeaderAction[],
    [handleOnClick, hasUser, handlerLogout],
  );

  const buttonItems = useMemo<ReactNode>(
    () =>
      actions
        .filter(({ show }) => show)
        .map(({ key, to, startIcon, text, onAction, buttonStyle }) => (
          <Button
            key={key}
            component={to ? Link : 'button'}
            to={to}
            sx={buttonStyle}
            onClick={onAction}
            startIcon={startIcon}
            variant="outlined"
          >
            {text}
          </Button>
        )),
    [actions],
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

    if (userSignal.value && lessThanSm) {
      items.splice(2, 0, <Divider key="divider" />);
    }

    return items;
  }, [actions, lessThanSm]);

  return { buttonItems, menuItems };
};
