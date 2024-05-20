import { RegistrationForm } from '@models/forms.model';
import { Grid } from '@mui/material';
import { SwitchElement } from 'react-hook-form-mui';

export interface SwitchDefaultAddressProps {
  title: string;
  addressIndex: number;
  disabled?: boolean;
}

export const DefaultAddress = ({ title, addressIndex, disabled = false }: SwitchDefaultAddressProps) => {
  return (
    <Grid item xs={1}>
      <SwitchElement<RegistrationForm> label={title} name={`addresses.${addressIndex}.isDefault`} disabled={disabled} />
    </Grid>
  );
};
