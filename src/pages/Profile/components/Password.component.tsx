import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInformationFormData } from '@models/forms.model';
import { Container, Grid, Paper, Stack, Typography, useEventCallback } from '@mui/material';
import { FormProvider, PasswordElement, useForm } from 'react-hook-form-mui';
import { useState } from 'react';
import {
  EditableFormActionsBar,
  EditableFormViewMode,
  FormActionsToolBarProps,
} from '@components/EditableFormActionsBar/EditableFormActionsBar';
import { passwordInformationSchema } from '@core/validation/user-profile/user-profile.schema';

export interface PasswordFormComponentProps {
  onSubmit: (
    passwordData: PasswordInformationFormData,
  ) => Promise<{ success: true } | { success: false; error: Error }>;
  isLoading?: boolean;
}

function PasswordFormComponent({ isLoading, onSubmit }: PasswordFormComponentProps) {
  const [viewMode, setViewMode] = useState<EditableFormViewMode>('view');
  const [isSaving, setIsSaving] = useState(isLoading);

  const isBusy = isLoading || isSaving;
  const readOnlyMode = viewMode === 'view';

  const formContext = useForm<PasswordInformationFormData>({
    defaultValues: {
      password: '',
      newPassword: '',
    },
    resolver: zodResolver(passwordInformationSchema),
    mode: 'all',
  });

  const { handleSubmit, reset } = formContext;

  const performSave = useEventCallback(async (data: PasswordInformationFormData) => {
    setIsSaving(true);
    const result = await onSubmit(data);
    setIsSaving(false);

    if (result.success) {
      setViewMode('view');
    }
  });

  const handleFormModeAction = useEventCallback<FormActionsToolBarProps['onAction']>((action) => {
    if (action === 'edit') {
      setViewMode('edit');
    } else if (action === 'cancel') {
      setViewMode('view');
      reset();
    }
  });

  return (
    <Container maxWidth="md">
      <Paper elevation={1} sx={{ p: '1vh 2%', width: '100%', mb: 2 }}>
        <FormProvider<PasswordInformationFormData> {...formContext}>
          <form onSubmit={handleSubmit(performSave)}>
            <Stack direction="row" spacing="auto" sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Set new password
              </Typography>
              <EditableFormActionsBar
                mode={viewMode}
                onAction={handleFormModeAction}
                isLoading={isBusy}
                disabled={isBusy}
              />
            </Stack>
            <Grid container spacing={{ xs: 1 }} columns={{ xs: 1, md: 2 }}>
              <Grid item xs={1}>
                <PasswordElement<PasswordInformationFormData>
                  label="Current password"
                  required
                  name="password"
                  helperText=" "
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={isBusy || readOnlyMode}
                />
              </Grid>
              <Grid item xs={1}>
                <PasswordElement<PasswordInformationFormData>
                  label="New password"
                  required
                  name="newPassword"
                  helperText=" "
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={isBusy || readOnlyMode}
                />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Paper>
    </Container>
  );
}

export default PasswordFormComponent;
