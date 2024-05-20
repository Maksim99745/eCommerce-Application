import { countriesOptions } from '@core/validation/user-registration/user-registration.const';
import { RegistrationForm } from '@models/forms.model';
import { FormControl, FormLabel, Stack } from '@mui/material';
import { SelectElement, TextFieldElement } from 'react-hook-form-mui';

export interface UserAddressProps {
  title: string;
  addressIndex: number;
  onCountryChange?: (country: string) => void;
  disabled?: boolean;
}

export function UserAddressComponent({ title, addressIndex, onCountryChange, disabled = false }: UserAddressProps) {
  return (
    <Stack spacing="10px">
      <FormControl>
        <FormLabel sx={{ pb: 2 }}>{title}</FormLabel>

        <SelectElement<RegistrationForm>
          label="Country"
          name={`addresses.${addressIndex}.country`}
          options={countriesOptions}
          helperText=" "
          required
          onChange={onCountryChange}
          disabled={disabled}
        />

        <TextFieldElement<RegistrationForm>
          name={`addresses.${addressIndex}.postalCode`}
          label="Postal Code"
          required
          helperText=" "
          InputLabelProps={{ shrink: true }}
          disabled={disabled}
        />

        <TextFieldElement<RegistrationForm>
          name={`addresses.${addressIndex}.city`}
          label="City"
          required
          helperText=" "
          InputLabelProps={{ shrink: true }}
          disabled={disabled}
        />

        <TextFieldElement<RegistrationForm>
          name={`addresses.${addressIndex}.street`}
          label="Street"
          required
          helperText=" "
          InputLabelProps={{ shrink: true }}
          disabled={disabled}
        />
      </FormControl>
    </Stack>
  );
}
