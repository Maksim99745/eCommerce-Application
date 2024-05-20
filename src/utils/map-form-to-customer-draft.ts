import { BaseAddress, MyCustomerDraft } from '@commercetools/platform-sdk';
import {
  BILLING_ADDRESS_IDX,
  NO_IDX,
  SHIPPING_ADDRESS_IDX,
} from '@core/validation/user-registration/user-registration.const';
import { RegistrationForm, RegistrationFormAddress } from '@models/forms.model';

function mapFormAddressToCustomerAddress(address: RegistrationFormAddress): BaseAddress {
  const { street, postalCode, country, city } = address;
  return { streetName: street, postalCode, country, city };
}

export function mapFormToCustomerDraft(data: RegistrationForm): MyCustomerDraft {
  const dataAddresses = data.shippingAsBilling ? [data.addresses[SHIPPING_ADDRESS_IDX]] : data.addresses;
  const addresses = dataAddresses.map(mapFormAddressToCustomerAddress);

  const draft: MyCustomerDraft = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    dateOfBirth: data.birthDate,
    addresses,
    ...(data.defaultShippingAddressIdx !== NO_IDX ? { defaultShippingAddress: data.defaultShippingAddressIdx } : {}),
    ...(data.defaultBillingAddressIdx !== NO_IDX ? { defaultBillingAddress: data.defaultBillingAddressIdx } : {}),
  };

  const addressesIndices = {
    shippingAddresses: [SHIPPING_ADDRESS_IDX],
    billingAddresses: [data.shippingAsBilling ? SHIPPING_ADDRESS_IDX : BILLING_ADDRESS_IDX],
  };
  return Object.assign(draft, addressesIndices);
}
