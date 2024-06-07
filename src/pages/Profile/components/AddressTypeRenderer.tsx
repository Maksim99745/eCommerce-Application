import AddCardIcon from '@mui/icons-material/AddCard';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { SvgIconOwnProps } from '@mui/material/SvgIcon/SvgIcon';
import { ProfileAddressFormData } from '@models/forms.model';
import { Stack } from '@mui/material';

export interface AddressTypeRendererProps {
  address: ProfileAddressFormData;
  sx?: SvgIconOwnProps['sx'];
}

export function AddressTypeRenderer({ address, sx }: AddressTypeRendererProps) {
  return (
    <Stack>
      {address.isShipping && <DeliveryDiningIcon sx={sx} />}
      {address.isBilling && <AddCardIcon sx={sx} />}
    </Stack>
  );
}
