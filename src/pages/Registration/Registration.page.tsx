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

function RegistrationPage(): ReactNode {
  const navigate = useNavigate();
  const showMessage = useShowMessage();

  const handleFormSubmit = useEventCallback<RegistrationFormProps['onSubmit']>((data) => {
    UserService.register(mapFormToCustomerDraft(data))
      .then(() => {
        navigate('/');
        showMessage(`Welcome! ${data.firstName} ${data.lastName}`);
      })
      .catch((error) => showMessage(`${error.message}`, 'error'));
  });

  return (
    <Stack direction="column" alignItems="center">
      <RegistrationFormComponent onSubmit={handleFormSubmit} isLoading={userLoadingSignal.value} />
      <CaptionLink caption="Already have an account?" linkCaption="Sign in" to="/login" />
    </Stack>
  );
}

export default RegistrationPage;
