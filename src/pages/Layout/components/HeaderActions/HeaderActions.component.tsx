import { apiService } from '@core/api/api.service';
import { useRequest } from '@core/api/use-request.hook';
import useAuth from '@hooks/useAuth';
import { Box, Button, Menu, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useHeaderActions } from '@pages/Layout/components/HeaderActions/useHeaderActions';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { bindMenu } from 'material-ui-popup-state';

function HeaderActionsComponent() {
  const { data: cartQuantity } = useRequest('cartQuantity', () => apiService.getCartQuantity());
  const popupState = usePopupState({ variant: 'popover', popupId: 'userMenu' });
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { buttonItems, menuItems } = useHeaderActions(() => popupState.close());
  const { user, isUserLoading } = useAuth();

  return (
    <Stack component="section" spacing={1} direction="row" alignItems="center">
      <Stack spacing={1} direction="row">
        {buttonItems}
      </Stack>

      <Button
        component={Link}
        to="/cart"
        sx={{ p: 1, borderRadius: 4 }}
        variant="contained"
        endIcon={<ShoppingCartIcon />}
      >
        {cartQuantity || 0}
      </Button>

      <Box sx={{ display: { md: 'none', lg: 'none', xl: 'none' } }}>
        {!isUserLoading && (user || lessThanSm) && (
          <>
            <Button
              {...bindTrigger(popupState)}
              variant="contained"
              sx={{ p: 1, borderRadius: '50%', height: '40px', minWidth: '40px' }}
            >
              <ManageAccountsIcon />
            </Button>

            <Menu {...bindMenu(popupState)}>{menuItems}</Menu>
          </>
        )}
      </Box>
    </Stack>
  );
}

const HeaderActionsMemoizedComponent = memo(HeaderActionsComponent);

export default HeaderActionsMemoizedComponent;
