import { defaultCountryOption, NO_IDX } from '@core/validation/user-registration/user-registration.const';
import {
  AddressInformationFormData,
  ProfileAddressFormData,
  ProfileAddressesFormData,
  AddressType,
} from '@models/forms.model';
import { useCallback } from 'react';
import { Address, Customer } from '@commercetools/platform-sdk';
import { AddressStringRenderer } from '@pages/Profile/components/AddressStringRenderer';

export const toAddressString = (address: AddressInformationFormData): string =>
  address ? [address.country, address.postalCode, address.city, address.streetName].filter(Boolean).join(', ') : '';

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
          label: <AddressStringRenderer address={address} />,
        }))
        .filter(withTypeOfAddress(addressType)),
    ],
    [addressType],
  );

export const getDefaultAddressIndex = (addressType: AddressType, userData: Customer): number => {
  const addressId = addressType === 'shipping' ? userData.defaultShippingAddressId : userData.defaultBillingAddressId;
  if (!addressId) {
    return NO_IDX;
  }
  const searchingAddress = userData.addresses.find((address) => address.id === addressId);
  const addressIDX = searchingAddress !== undefined ? userData.addresses.indexOf(searchingAddress) : NO_IDX;
  return addressIDX;
};

export const getNewUserProfileAddress = (): ProfileAddressFormData => ({
  addressUID: crypto.randomUUID(),
  country: defaultCountryOption.id,
  city: '',
  postalCode: '',
  streetName: '',
  isBilling: true,
  isShipping: true,
  isNewAddress: true,
});

export const getCustomerProfileAddress =
  (userData: Customer) =>
  ({ id = '', country, postalCode = '', city = '', streetName = '' }: Address): ProfileAddressFormData => ({
    addressUID: id,
    country,
    postalCode,
    city,
    streetName,
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
