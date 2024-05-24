import { NO_IDX } from '@core/validation/user-registration/user-registration.const';
import { AddressInformationForm } from '@models/forms.model';
import { Typography } from '@mui/material';
import { useCallback } from 'react';

export const toAddressString = (address: AddressInformationForm): string =>
  [address.country, address.postalCode, address.city, address.street].filter(Boolean).join(', ');

export const withTypeOfAddress =
  (addressType: AddressInformationForm['addressType']) => (address: AddressInformationForm) =>
    address.addressType === addressType;

export const useAddressRenderOptions = (addressType: AddressInformationForm['addressType']) =>
  useCallback(
    (addresses: AddressInformationForm[]) => [
      { id: NO_IDX, label: 'None' },
      ...addresses
        .map((address, index) => ({
          ...address,
          id: index,
          label: (
            <Typography sx={{ textWrap: 'pretty', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {toAddressString(address)}
            </Typography>
          ),
        }))
        .filter(withTypeOfAddress(addressType)),
    ],
    [addressType],
  );
