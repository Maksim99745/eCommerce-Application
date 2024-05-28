import { countriesOptions } from '@core/validation/user-registration/user-registration.const';
import { addressSchema } from '@core/validation/user-registration/user-registration.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressInformationFormData } from '@models/forms.model';
import { Grid } from '@mui/material';
import { FormContainer, SelectElement, TextFieldElement, useForm } from 'react-hook-form-mui';

export interface AddressDataProps {
  country: string;
  city: string;
  street: string;
  postalCode: string;
}

export function AddressComponent({ country, city, street, postalCode }: AddressDataProps) {
  const formContext = useForm<AddressInformationFormData>({
    defaultValues: {
      country,
      city,
      street,
      postalCode,
    },
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer<AddressInformationFormData> formContext={formContext}>
      <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1 }}>
        <Grid item xs={1}>
          <SelectElement<AddressInformationFormData>
            label="Country"
            name="country"
            options={countriesOptions}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={1}>
          <TextFieldElement<AddressInformationFormData>
            label="City"
            name="city"
            InputLabelProps={{ shrink: true }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={1}>
          <TextFieldElement<AddressInformationFormData>
            label="Street"
            name="street"
            InputLabelProps={{ shrink: true }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <TextFieldElement<AddressInformationFormData>
            label="Postal code"
            name="postalCode"
            InputLabelProps={{ shrink: true }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default AddressComponent;
