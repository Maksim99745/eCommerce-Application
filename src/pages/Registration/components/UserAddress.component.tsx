import { countriesOptions } from '@core/validation/user-registration/user-registration.const';
import { RegistrationFormData } from '@models/forms.model';
import { Stack } from '@mui/material';
import { SelectElement, TextFieldElement } from 'react-hook-form-mui';
import { ReactNode } from 'react';

export interface UserAddressProps {
  title: ReactNode;
  addressIndex: number;
  onCountryChange?: (country: string) => void;
  disabled?: boolean;
}

export function UserAddressComponent({ title, addressIndex, onCountryChange, disabled = false }: UserAddressProps) {
  return (
    <Stack spacing={1} minWidth={300}>
      {title}
      <SelectElement<RegistrationFormData>
        label="Country"
        name={`addresses.${addressIndex}.country`}
        options={countriesOptions}
        helperText=" "
        required
        fullWidth
        onChange={onCountryChange}
        disabled={disabled}
      />
      <TextFieldElement<RegistrationFormData>
        name={`addresses.${addressIndex}.postalCode`}
        label="Postal Code"
        required
        helperText=" "
        InputLabelProps={{ shrink: true }}
        disabled={disabled}
      />
      <TextFieldElement<RegistrationFormData>
        name={`addresses.${addressIndex}.city`}
        label="City"
        required
        helperText=" "
        InputLabelProps={{ shrink: true }}
        disabled={disabled}
      />
      <TextFieldElement<RegistrationFormData>
        name={`addresses.${addressIndex}.street`}
        label="Street"
        required
        helperText=" "
        InputLabelProps={{ shrink: true }}
        disabled={disabled}
      />
    </Stack>
  );
}
