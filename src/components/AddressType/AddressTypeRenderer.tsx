import { AddressType } from '@models/forms.model';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { match } from 'ts-pattern';
import { SvgIconOwnProps } from '@mui/material/SvgIcon/SvgIcon';

export interface AddressTypeRendererProps {
  addressType: AddressType;
  sx?: SvgIconOwnProps['sx'];
}

export const AddressTypeRenderer = ({ addressType, sx }: AddressTypeRendererProps) =>
  match(addressType)
    .with('billing', () => <AddCardIcon sx={sx} />)
    .with('shipping', () => <DeliveryDiningIcon sx={sx} />)
    .otherwise(() => null);
