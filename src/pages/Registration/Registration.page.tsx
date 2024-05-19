import { UserService } from '@core/api/user.service';
import { userLoadingSignal } from '@core/signals/user.signal';
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
import { createAuthErrorMessage } from '@core/errorHandlers/createAuthErrorMessage';

function RegistrationPage(): ReactNode {
  const navigate = useNavigate();
  const showMessage = useShowMessage();

  const handleFormSubmit = useEventCallback<RegistrationFormProps['onSubmit']>((data) => {
    UserService.register(mapFormToCustomerDraft(data))
      .then(() => {
        navigate('/');
        showMessage(`Welcome ${data.firstName} ${data.lastName}!
        You have successfully created an account.
        Happy shopping! 🛍️`);
      })
      .catch((error) => {
        const message = createAuthErrorMessage(error);
        showMessage(message, 'error');
      });
  });

  return (
    <Stack direction="column" alignItems="center">
      <RegistrationFormComponent onSubmit={handleFormSubmit} isLoading={userLoadingSignal.value} />
      <CaptionLink caption="Already have an account?" linkCaption="Sign in" to="/login" />
    </Stack>
  );
}

export default RegistrationPage;
