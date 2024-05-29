import { defaultCountryOption, NO_IDX } from '@core/validation/user-registration/user-registration.const';
import {
  AddressInformationFormData,
  ProfileAddressFormData,
  ProfileAddressesFormData,
  AddressType,
} from '@models/forms.model';
import { Typography } from '@mui/material';
import { useCallback } from 'react';
import { Address, Customer } from '@commercetools/platform-sdk';

export const toAddressString = (address: AddressInformationFormData): string =>
  address ? [address.country, address.postalCode, address.city, address.street].filter(Boolean).join(', ') : '';

export const withTypeOfAddress = (addressType: AddressType) => (address: AddressInformationFormData) =>
  (addressType === 'billing' && address.isBilling) || (addressType === 'shipping' && address.isShipping);

export const useAddressRenderOptions = (addressType: AddressType) =>
  useCallback(
    (addresses: AddressInformationFormData[]) => [
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

export const getNewUserProfileAddress = (): ProfileAddressFormData => ({
  id: crypto.randomUUID(),
  country: defaultCountryOption.id,
  city: '',
  postalCode: '',
  street: '',
  isBilling: false,
  isShipping: false,
  isNewAddress: true,
});

export const getCustomerProfileAddress =
  (userData: Customer) =>
  ({ id = '', country, postalCode = '', city = '', streetName = '' }: Address): ProfileAddressFormData => ({
    id,
    country,
    postalCode,
    city,
    street: streetName,
    isNewAddress: false,
    isBilling: !!userData.billingAddressIds?.includes(id),
    isShipping: !!userData.shippingAddressIds?.includes(id),
  });

export const getCustomerProfileAddresses = (userData: Customer): ProfileAddressesFormData => {
  const customerAddresses = (userData.addresses ?? []).map(getCustomerProfileAddress(userData));
  // TODO populate appropriate defaultShippingAddressIdx, defaultBillingAddressIdx from Customer data
  const customerDefaultShippingAddressIdx = NO_IDX;
  const customerDefaultBillingAddressIdx = NO_IDX;
  return {
    addresses: customerAddresses,
    defaultShippingAddressIdx: customerDefaultShippingAddressIdx,
    defaultBillingAddressIdx: customerDefaultBillingAddressIdx,
    // defaultShippingAddressIdx: NO_IDX,
    // defaultBillingAddressIdx: NO_IDX,
  };
};
