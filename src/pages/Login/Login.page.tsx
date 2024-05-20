import { UserService } from '@core/api/user.service';
import { userLoadingSignal } from '@core/signals/user.signal';
import { ReactNode } from 'react';
import { Container, Paper, useEventCallback } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useShowMessage } from '@hooks/useShowMessage';
import { CaptionLink } from '@components/CaptionLink/CaptionLink';
import { LoginFormComponent, LoginFormProps } from '@pages/Login/components/LoginForm.component';
import { createAuthErrorMessage } from '@core/errorHandlers/authErrors/createAuthErrorMessage';

function LoginPage(): ReactNode {
  const navigate = useNavigate();
  const showMessage = useShowMessage();

  const handleFormSubmit = useEventCallback<LoginFormProps['onSubmit']>((data) => {
    UserService.login(data)
      .then(() => {
        showMessage('Welcome to Homeware Hub! Happy shopping! 🛍️');
        navigate('/');
      })
      .catch((error) => {
        const message = createAuthErrorMessage(error);
        showMessage(message, 'error');
      });
  });

  return (
    <Paper elevation={3} sx={{ m: 'auto', p: '10vh 2%', maxWidth: '700px' }}>
      <Container maxWidth="sm">
        <LoginFormComponent onSubmit={handleFormSubmit} isLoading={userLoadingSignal.value} />
        <CaptionLink caption="Don't have an account?" linkCaption="Sign up" to="/registration" />
      </Container>
    </Paper>
  );
}

export default LoginPage;
