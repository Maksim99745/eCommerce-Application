import { userLoadingSignal, userSignal } from '@core/signals/user.signal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import { PopupState } from 'material-ui-popup-state/hooks';
import { HeaderAction } from './header-action.model';

export const useActions = (
  popupState: PopupState,
  handlerLogout: () => void,
  styles: Record<string, object>,
): HeaderAction[] => [
  {
    key: 'login',
    to: '/login',
    startIcon: <ExitToAppIcon />,
    text: 'Sign In',
    onClick: popupState.close,
    buttonStyle: { ...styles.button, ...styles.showAfterSm },
    menuItemStyle: { display: { sm: 'none' } },
    show: true,
    menuOrder: 3,
  },
  {
    key: 'registration',
    to: '/registration',
    startIcon: <HowToRegIcon />,
    text: 'Sign Up',
    onClick: popupState.close,
    buttonStyle: { ...styles.button, ...styles.showAfterSm },
    menuItemStyle: { display: { sm: 'none' } },
    show: true,
    menuOrder: 4,
  },
  {
    key: 'profile',
    to: '/profile',
    startIcon: <AccountCircleIcon />,
    text: 'Profile',
    onClick: popupState.close,
    buttonStyle: { ...styles.button, ...styles.showAfterMd },
    menuItemStyle: {},
    show: !userLoadingSignal.value && !!userSignal.value,
    menuOrder: 1,
  },
  {
    key: 'logout',
    to: '',
    startIcon: <LogoutIcon />,
    text: 'Sign Out',
    onClick: handlerLogout,
    buttonStyle: { ...styles.button, ...styles.showAfterMd },
    menuItemStyle: {},
    show: !userLoadingSignal.value && !!userSignal.value,
    menuOrder: 2,
  },
];
