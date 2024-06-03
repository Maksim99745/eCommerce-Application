import AddCardIcon from '@mui/icons-material/AddCard';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { SvgIconOwnProps } from '@mui/material/SvgIcon/SvgIcon';
import { ProfileAddressFormData } from '@models/forms.model';

export interface AddressTypeRendererProps {
  address: ProfileAddressFormData;
  sx?: SvgIconOwnProps['sx'];
}

export function AddressTypeRenderer({ address, sx }: AddressTypeRendererProps) {
  return (
    <>
      {address.isShipping && <DeliveryDiningIcon sx={sx} />}
      {address.isBilling && <AddCardIcon sx={sx} />}
    </>
  );
}
