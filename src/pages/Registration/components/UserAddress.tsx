import { countriesOptions } from '@constants/countries.const';
import { UserRegistrationData } from '@models/index';
import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { SelectElement, SwitchElement, TextFieldElement } from 'react-hook-form-mui';

export interface UserAddressProps {
  title: string;
  addressIndex: number;
}

export function UserAddress({ title, addressIndex }: UserAddressProps) {
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
      />
      <TextFieldElement<UserRegistrationData>
        name={`addresses.${addressIndex}.postalCode`}
        label="Postal Code"
        required
        helperText=" "
      />
      <TextFieldElement<UserRegistrationData>
        name={`addresses.${addressIndex}.city`}
        label="City"
        required
        helperText=" "
      />
      <TextFieldElement<UserRegistrationData>
        name={`addresses.${addressIndex}.street`}
        label="Street"
        required
        helperText=" "
      />
      <SwitchElement<UserRegistrationData> label="set as default" name={`addresses.${addressIndex}.isDefault`} />
      {/* {AsBillingButton} */}
    </Stack>
  );
}
