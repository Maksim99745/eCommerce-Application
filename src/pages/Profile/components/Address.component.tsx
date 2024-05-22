import { addressSchema } from '@core/validation/user-registration/user-registration.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressInformationForm } from '@models/address-data.model';
import { Grid } from '@mui/material';
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';

export interface AddressDataProps {
  country: string;
  city: string;
  street: string;
  postalCode: string;
  addressType: 'billing' | 'shipping';
}

export function Address({ country, city, street, postalCode, addressType }: AddressDataProps) {
  const formContext = useForm<AddressInformationForm>({
    defaultValues: {
      country,
      city,
      street,
      postalCode,
      addressType,
    },
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer<AddressInformationForm> formContext={formContext}>
      <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1 }}>
        <Grid item xs={1}>
          <TextFieldElement<AddressInformationForm>
            label="Country"
            name="country"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={1}>
          <TextFieldElement<AddressInformationForm>
            label="City"
            name="city"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={1}>
          <TextFieldElement<AddressInformationForm>
            label="Street"
            name="street"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <TextFieldElement<AddressInformationForm>
            label="Postal code"
            name="postalCode"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default Address;
