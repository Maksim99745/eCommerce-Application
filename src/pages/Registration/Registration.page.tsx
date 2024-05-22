import useAuth from '@hooks/useAuth';
import { mapFormToCustomerDraft } from '@utils/map-form-to-customer-draft';
import { ReactNode } from 'react';
import { Stack, useEventCallback } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useShowMessage } from '@hooks/useShowMessage';
import { CaptionLink } from '@components/CaptionLink/CaptionLink';
import {
  RegistrationFormComponent,
  RegistrationFormProps,
} from '@pages/Registration/components/RegistrationForm.component';
import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';

function RegistrationPage(): ReactNode {
  const navigate = useNavigate();
  const showMessage = useShowMessage();
  const { isUserLoading, register } = useAuth();

  const handleFormSubmit = useEventCallback<RegistrationFormProps['onSubmit']>((data) => {
    register(mapFormToCustomerDraft(data))
      .then(() => {
        navigate('/');
        showMessage(`Welcome ${data.firstName} ${data.lastName}!
        You have successfully created an account.
        Happy shopping! 🛍️`);
      })
      .catch((error) => {
        const message = createAppErrorMessage(error);
        showMessage(message, 'error');
      });
  });

  return (
    <Stack direction="column" alignItems="center">
      <RegistrationFormComponent onSubmit={handleFormSubmit} isLoading={isUserLoading} />
      <CaptionLink caption="Already have an account?" linkCaption="Sign in" to="/login" />
    </Stack>
  );
}

export default RegistrationPage;
