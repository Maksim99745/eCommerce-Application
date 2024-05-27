import { personalInformationSchema } from '@core/validation/user-profile/user-profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInformationForm } from '@models/forms.model';
import { Container, Grid, Paper, Stack, Typography, useEventCallback } from '@mui/material';
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';
import { useState } from 'react';
import {
  EditableFormActionsBar as ActionsBar,
  EditableFormViewMode as ViewMode,
  FormActionsToolBarProps as ToolBarProps,
} from '../../../components/EditableFormActionsBar/EditableFormActionsBar';

export interface PasswordFormComponentProps {
  onSubmit: (personalData: PasswordInformationForm) => void;
  isLoading?: boolean;
}

function PasswordFormComponent({ isLoading, onSubmit }: PasswordFormComponentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('view');
  const [readOnlyMode, setReadOnlyMode] = useState<boolean>(true);

  const formContext = useForm<PasswordInformationForm>({
    defaultValues: {
      password: '',
      newPassword: '',
    },
    resolver: zodResolver(personalInformationSchema),
    mode: 'all',
  });

  const { handleSubmit, reset } = formContext;

  const handleFormModeAction = useEventCallback<ToolBarProps['onAction']>((action) => {
    if (action === 'edit') {
      setViewMode('edit');
      setReadOnlyMode(false);
    } else if (action === 'cancel') {
      setViewMode('view');
      setReadOnlyMode(true);
      reset();
    } else if (action === 'save') {
      handleSubmit(async (data: PasswordInformationForm) => {
        onSubmit(data);
        setReadOnlyMode(true);
        setViewMode('view');
      })();
    }
  });

  return (
    <Container maxWidth="md">
      <Paper elevation={1} sx={{ p: '1vh 2%', width: '100%', mb: 2 }}>
        <FormContainer<PasswordInformationForm> formContext={formContext}>
          <Stack direction="row" spacing="auto" sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Personal information
            </Typography>
            <ActionsBar mode={viewMode} onAction={handleFormModeAction} isLoading={isLoading} />
          </Stack>
          <Grid container spacing={{ xs: 1 }} columns={{ xs: 1, md: 2 }}>
            <Grid item xs={1}>
              <TextFieldElement<PasswordInformationForm>
                label="First name"
                name="password"
                helperText={' '}
                fullWidth
                InputLabelProps={{ shrink: true }}
                disabled={isLoading}
                InputProps={{
                  readOnly: readOnlyMode,
                }}
              />
            </Grid>
          </Grid>
        </FormContainer>
      </Paper>
    </Container>
  );
}

export default PasswordFormComponent;
