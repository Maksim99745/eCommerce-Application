import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { UserRegistrationData } from '@pages/Registration/components/RegistrationForm';

export function getCustomerDraft(data: UserRegistrationData): MyCustomerDraft {
  const dataAddresses = data.shippingAsBilling ? [data.addresses[0]] : data.addresses;
  const addresses = dataAddresses.map(({ street: streetName, postalCode, country, city }) => ({
    streetName,
    postalCode,
    country,
    city,
  }));

  const draft: MyCustomerDraft = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    dateOfBirth: data.birthDate,
    addresses,
    ...(data.addresses[0].isDefault ? { defaultShippingAddress: 0 } : {}),
    ...(data.addresses[1].isDefault ? { defaultBillingAddress: 0 } : {}),
  };

  const addressesIndices = {
    shippingAddresses: [0],
    billingAddresses: [data.shippingAsBilling ? 0 : 1],
  };

  return Object.assign(draft, addressesIndices);
}
