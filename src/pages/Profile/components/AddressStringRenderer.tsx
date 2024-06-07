import { AddressInformationFormData } from '@models/forms.model';
import { SvgIconOwnProps } from '@mui/material/SvgIcon/SvgIcon';
import { Typography } from '@mui/material';
import { toAddressString } from '@utils/user-address-utils';

export interface AddressStringRendererProps {
  address: AddressInformationFormData;
  sx?: SvgIconOwnProps['sx'];
}
export function AddressStringRenderer({ address, sx = {} }: AddressStringRendererProps) {
  return (
    <Typography sx={{ textWrap: 'pretty', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'balance', ...sx }}>
      {toAddressString(address)}
    </Typography>
  );
}
