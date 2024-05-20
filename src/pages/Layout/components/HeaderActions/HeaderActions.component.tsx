import { apiService } from '@core/api/api.service';
import { useRequest } from '@core/api/use-request.hook';
import { UserService } from '@core/api/user.service';
import { userLoadingSignal, userSignal } from '@core/signals/user.signal';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useActions } from '@pages/Layout/components/HeaderActions/useActions';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { memo, ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { bindMenu } from 'material-ui-popup-state';

const headerActionsStyles = {
  container: { display: 'flex', gap: '10px', alignItems: 'center' },
  cartButton: { p: 1, borderRadius: 4 },
  userButton: { p: 1, borderRadius: '50%', height: '40px', minWidth: '40px' },
  button: { textTransform: 'none', color: 'inherit', borderColor: 'inherit' },
  showAfterSm: { display: { xs: 'none', sm: 'flex' } },
  showAfterMd: { display: { xs: 'none', sm: 'none', md: 'flex' } },
  showBeforeMd: { display: { md: 'none', lg: 'none', xl: 'none' } },
};

function HeaderActionsComponent() {
  const { data: cartQuantity } = useRequest('cartQuantity', () => apiService.getCartQuantity());
  const popupState = usePopupState({ variant: 'popover', popupId: 'userMenu' });
  const navigate = useNavigate();
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down('sm'));

  const handlerLogout = () => {
    popupState.close();
    UserService.logout();
    navigate('/');
  };

  const actions = useActions(popupState, handlerLogout, headerActionsStyles);

  let buttonItems: ReactNode[] = [];
  let menuItems: ReactNode[] = [];

  const fillButtons = (): void => {
    buttonItems = actions
      .filter(({ show }) => show)
      .map(({ key, to, startIcon, text, onClick, buttonStyle }) => (
        <Button
          key={key}
          component={to ? Link : 'button'}
          to={to}
          sx={buttonStyle}
          onClick={onClick}
          startIcon={startIcon}
          variant="outlined"
        >
          {text}
        </Button>
      ));
  };

  const fillMenuItems = (): void => {
    menuItems = actions
      .filter(({ show }) => show)
      .sort((item1, item2) => (item1.menuOrder > item2.menuOrder ? 1 : -1))
      .map(({ key, to, startIcon, text, onClick, menuItemStyle }) => (
        <MenuItem key={key} component={to ? Link : 'button'} to={to} sx={menuItemStyle} onClick={onClick}>
          <ListItemIcon>{startIcon}</ListItemIcon>
          {text}
        </MenuItem>
      ));

    if (userSignal.value && lessThanSm) {
      menuItems.splice(2, 0, <Divider key="divider" />);
    }
  };

  fillButtons();
  fillMenuItems();

  useEffect(() => {
    fillButtons();
    fillMenuItems();
  });

  return (
    <Box component="section" sx={headerActionsStyles.container}>
      <Stack spacing={1} direction="row">
        {buttonItems}

        {userLoadingSignal.value && <CircularProgress color="inherit" size={30} sx={headerActionsStyles.showAfterMd} />}
      </Stack>

      <Button
        component={Link}
        to="/cart"
        sx={headerActionsStyles.cartButton}
        variant="contained"
        endIcon={<ShoppingCartIcon />}
      >
        {cartQuantity || 0}
      </Button>

      <Box sx={headerActionsStyles.showBeforeMd}>
        {userLoadingSignal.value && <CircularProgress color="inherit" size={30} />}

        {!userLoadingSignal.value && (userSignal.value || lessThanSm) && (
          <>
            <Button {...bindTrigger(popupState)} variant="contained" sx={headerActionsStyles.userButton}>
              <ManageAccountsIcon />
            </Button>

            <Menu {...bindMenu(popupState)}>{menuItems}</Menu>
          </>
        )}
      </Box>
    </Box>
  );
}

const HeaderActionsMemoizedComponent = memo(HeaderActionsComponent);

export default HeaderActionsMemoizedComponent;
