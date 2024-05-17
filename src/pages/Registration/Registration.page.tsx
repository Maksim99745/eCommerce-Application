import { UserService } from '@core/api/user.service';
import { userLoadingSignal } from '@core/signals/user.signal';
import { getCustomerDraft } from '@utils/get-customer-draft.util';
import { ReactNode } from 'react';
import { Stack, useEventCallback } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useShowMessage } from '@utils/useShowMessage';
import { CaptionLink } from '@components/CaptionLink/CaptionLink';
import { RegistrationForm, RegistrationFormProps } from './components/RegistrationForm';

function RegistrationPage(): ReactNode {
  const navigate = useNavigate();
  const showMessage = useShowMessage();

  const handleFormSubmit = useEventCallback<RegistrationFormProps['onSubmit']>((data) => {
    UserService.register(getCustomerDraft(data))
      .then(() => {
        navigate('/');
        showMessage(`Welcome! ${data.firstName} ${data.lastName}`);
      })
      .catch((error) => {
        showMessage(`${error.message}`, 'error');
      });
  });

  return (
    <Stack direction="column" alignItems="center">
      <RegistrationForm onSubmit={handleFormSubmit} isLoading={userLoadingSignal.value} />
      <CaptionLink caption="Already have an account?" linkCaption="Sign in" to="/login" />
    </Stack>
  );
}

export default RegistrationPage;
