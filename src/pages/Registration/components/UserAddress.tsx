import { countriesOptions } from '@constants/countries.const';
import { Stack, Typography } from '@mui/material';
import { SelectElement, SwitchElement, TextFieldElement } from 'react-hook-form-mui';
import { UserRegistrationData } from '@pages/Registration/components/RegistrationForm';

export interface UserAddressProps {
  title: string;
  addressIndex: number;
  onCountryChange?: (country: string) => void;
}

export function UserAddress({ title, addressIndex, onCountryChange }: UserAddressProps) {
  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <SelectElement<UserRegistrationData>
        label="Country"
        name={`addresses.${addressIndex}.country`}
        options={countriesOptions}
        helperText=" "
        required
        onChange={onCountryChange}
      />
      <TextFieldElement<UserRegistrationData>
        name={`addresses.${addressIndex}.postalCode`}
        label="Postal Code"
        required
        helperText=" "
        InputLabelProps={{ shrink: true }}
      />
      <TextFieldElement<UserRegistrationData>
        name={`addresses.${addressIndex}.city`}
        label="City"
        required
        helperText=" "
        InputLabelProps={{ shrink: true }}
      />
      <TextFieldElement<UserRegistrationData>
        name={`addresses.${addressIndex}.street`}
        label="Street"
        required
        helperText=" "
        InputLabelProps={{ shrink: true }}
      />
      <SwitchElement<UserRegistrationData> label="set as default" name={`addresses.${addressIndex}.isDefault`} />
    </Stack>
  );
}
