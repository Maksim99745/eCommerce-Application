import { apiService } from '@core/api/api.service';
import { useRequest } from '@core/api/use-request.hook';
import { UserService } from '@core/api/user.service';
import { userLoadingSignal, userSignal } from '@core/signals/user.signal';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const headerActionsStyles = {
  container: { display: 'flex', gap: '10px' },
  button: { color: '#fff', borderColor: '#fff', textTransform: 'none' },
  buttonText: { display: { xs: 'none', sm: 'block' }, ml: '5px' },
};

function HeaderActionsComponent() {
  const { data: cartQuantity } = useRequest('cartQuantity', () => apiService.getCartQuantity());
  const navigate = useNavigate();

  const handlerLogout = () => {
    UserService.logout();
    navigate('/');
  };

  return (
    <Box component="section" sx={headerActionsStyles.container}>
      <Button component={Link} to="/login" sx={headerActionsStyles.button} variant="outlined">
        <ExitToAppIcon />
        <Typography sx={headerActionsStyles.buttonText}>Sign In</Typography>
      </Button>

      <Button component={Link} to="/registration" sx={headerActionsStyles.button} variant="outlined">
        <HowToRegIcon />
        <Typography sx={headerActionsStyles.buttonText}>Sign Up</Typography>
      </Button>

      {userLoadingSignal.value && <CircularProgress color="inherit" />}

      {!userLoadingSignal.value && !!userSignal.value && (
        <>
          <Button component={Link} to="/profile" sx={headerActionsStyles.button} variant="outlined">
            <AccountCircleIcon />
            <Typography sx={headerActionsStyles.buttonText}>Profile</Typography>
          </Button>

          <Button sx={headerActionsStyles.button} variant="outlined" onClick={handlerLogout} color="secondary">
            <LogoutIcon />
            <Typography sx={headerActionsStyles.buttonText}>Sign Out</Typography>
          </Button>
        </>
      )}

      <Button component={Link} to="/cart" sx={headerActionsStyles.button} variant="text">
        <ShoppingCartIcon />
        <Typography sx={headerActionsStyles.buttonText}>Cart: </Typography>
        <Typography>{cartQuantity || 0}</Typography>
      </Button>
    </Box>
  );
}

const HeaderActionsMemoizedComponent = memo(HeaderActionsComponent);

export default HeaderActionsMemoizedComponent;