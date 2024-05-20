import dayjs from 'dayjs';

export const exampleRegistrationData = Object.freeze({
  firstName: 'f',
  lastName: 'g',
  birthDate: dayjs('2018-06-05T22:00:00.000Z'),
  shippingAsBilling: true,
  defaultShippingAddressIdx: -1,
  defaultBillingAddressIdx: -1,
  email: 'jaks134@mail.ru',
  password: 'fjfD3&dl#sL',
  addresses: [
    {
      street: 'dd',
      city: 'dd',
      country: 'PL',
      postalCode: '22-223',
      addressType: 'shipping',
    },
  ],
});
