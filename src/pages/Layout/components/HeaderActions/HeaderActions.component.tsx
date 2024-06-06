import useAuth from '@core/api/hooks/useAuth';
import { useCart } from '@hooks/useCart';
import { Badge, BadgeProps, Button, CircularProgress, Menu, Stack, styled } from '@mui/material';
import { useHeaderActions } from '@pages/Layout/components/HeaderActions/useHeaderActions';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { bindMenu } from 'material-ui-popup-state';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -15,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function HeaderActionsComponent() {
  const { cart } = useCart();
  const popupState = usePopupState({ variant: 'popover', popupId: 'userMenu' });
  const { buttonItems, menuItems } = useHeaderActions(() => popupState.close());
  const { isUserLoading } = useAuth();

  return (
    <Stack component="section" spacing={1} direction="row" alignItems="center">
      <Stack spacing={1} direction="row">
        {buttonItems}
      </Stack>

      <Button
        aria-label="cart"
        sx={{ p: 1, borderRadius: 4 }}
        component={Link}
        to="/cart"
        size="large"
        variant="contained"
      >
        <StyledBadge badgeContent={cart?.totalLineItemQuantity || 0} color="info">
          <ShoppingCartIcon />
        </StyledBadge>
      </Button>

      {isUserLoading && <CircularProgress color="inherit" size="40px" sx={{ p: '5px' }} />}

      {!isUserLoading && (
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
    </Stack>
  );
}

const HeaderActionsMemoizedComponent = memo(HeaderActionsComponent);

export default HeaderActionsMemoizedComponent;
