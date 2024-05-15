export type SelectOption = {
  id: string;
  label: string;
};

export type Address = {
  street: string;
  city: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
};

export type UserRegistrationData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  shippingAsBilling: boolean;
  addresses: Address[];
};
