import { apiService } from '@core/api/api.service';
import { useRequest } from '@core/api/use-request.hook';
import { UserService } from '@core/api/user.service';
import { userLoadingSignal, userSignal } from '@core/signals/user.signal';
import { Box, Button, CircularProgress, Divider, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { bindMenu } from 'material-ui-popup-state';

const headerActionsStyles = {
  container: { display: 'flex', gap: '10px', alignItems: 'center' },
  cartButton: { p: 1, borderRadius: 4 },
  userButton: { p: 1, borderRadius: '50%', height: '40px', minWidth: '40px' },
};

function HeaderActionsComponent() {
  const { data: cartQuantity } = useRequest('cartQuantity', () => apiService.getCartQuantity());
  const popupState = usePopupState({ variant: 'popover', popupId: 'userMenu' });
  const navigate = useNavigate();

  const handlerLogout = () => {
    popupState.close();
    UserService.logout();
    navigate('/');
  };

  return (
    <Box component="section" sx={headerActionsStyles.container}>
      {userLoadingSignal.value && <CircularProgress color="inherit" size="30px" />}

      {!userLoadingSignal.value && (
        <>
          <Button {...bindTrigger(popupState)} variant="contained" sx={headerActionsStyles.userButton}>
            <ManageAccountsIcon />
          </Button>

          <Menu {...bindMenu(popupState)}>
            {userSignal.value && (
              <>
                <MenuItem onClick={popupState.close} component={Link} to="/profile">
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  Profile
                </MenuItem>

                <MenuItem onClick={handlerLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  Sign Out
                </MenuItem>
                <Divider />
              </>
            )}
            <MenuItem onClick={popupState.close} component={Link} to="/login">
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              Sign In
            </MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to="/registration">
              <ListItemIcon>
                <HowToRegIcon />
              </ListItemIcon>
              Sign Up
            </MenuItem>
          </Menu>
        </>
      )}

      <Button component={Link} to="/cart" sx={headerActionsStyles.cartButton} variant="contained">
        <Typography sx={{ mr: 1 }}>{cartQuantity || 0}</Typography>
        <ShoppingCartIcon />
      </Button>
    </Box>
  );
}

const HeaderActionsMemoizedComponent = memo(HeaderActionsComponent);

export default HeaderActionsMemoizedComponent;
