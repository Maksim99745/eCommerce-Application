import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
  DatePickerElement,
  useForm,
  CheckboxElement,
} from 'react-hook-form-mui';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRegistrationData } from '@models/index';
import { Box, Button, Stack, Typography } from '@mui/material';
import { defaultCountryOption } from '@constants/countries.const';
import { registrationSchema } from '@core/validation/user-registration.validation.schema';
import { UserAddress } from './UserAddress';

const formStyles = {
  form: { display: 'flex', flexDirection: 'column', width: '100%', height: '100%' },
  submitButton: { width: 100 },
  textField: { minWidth: 410 },
  divider: { height: '1px', backgroundColor: 'black' },
};

export interface RegistrationFormProps {
  onSubmit: (registrationData: UserRegistrationData) => void;
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  // const [isSameAddresses, setSameAddressValue] = useState(false);

  // const handleSameAddressesSet = () => {
  //   setSameAddressValue(!isSameAddresses);
  // };

  // const billingAddressForm = isSameAddresses ? null : <UserAddress title="Billing address" addressIndex={1} />;
  const formContext = useForm<UserRegistrationData>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      shippingAsBilling: false,
      addresses: [
        { street: '', city: '', country: defaultCountryOption.id, postalCode: '', isDefault: false },
        { street: '', city: '', country: defaultCountryOption.id, postalCode: '', isDefault: false },
      ],
    },
    resolver: zodResolver(registrationSchema),
  });

  // const {formState :{}} = formContext;

  return (
    <FormContainer<UserRegistrationData> formContext={formContext} onSuccess={onSubmit} mode="onChange">
      <Box sx={formStyles.form}>
        <Typography variant="h4" gutterBottom>
          Sign up
        </Typography>
        <TextFieldElement<UserRegistrationData> name="email" label="Email" required helperText=" " />
        <PasswordElement<UserRegistrationData>
          margin="dense"
          label="Password"
          required
          name="password"
          helperText=" "
        />
        <TextFieldElement<UserRegistrationData> name="firstName" label="First Name" required helperText=" " />
        <TextFieldElement<UserRegistrationData> name="lastName" label="Last Name" required helperText=" " />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerElement<UserRegistrationData> name="birthDate" label="Birth Date" required helperText=" " />
        </LocalizationProvider>
        <Stack gap={2}>
          <UserAddress title="Shipping address" addressIndex={0} />
          <CheckboxElement<UserRegistrationData> name="shippingAsBilling" label="Also use as billing address" />
          <UserAddress title="Billing address" addressIndex={1} />
        </Stack>
        <Button type="submit" variant="contained" color="primary" sx={formStyles.submitButton}>
          Sign up
        </Button>
      </Box>
    </FormContainer>
  );
}
