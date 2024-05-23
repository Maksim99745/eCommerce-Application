import { Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';
import { LoadingButton } from '@mui/lab';

export type EditableFormAction = 'edit' | 'cancel' | 'save';
export type EditableFormViewMode = 'view' | 'edit';

export interface FormActionsToolBarProps {
  mode: EditableFormViewMode;
  disabled?: boolean;
  isLoading?: boolean;
  onAction: (action: EditableFormAction) => void;
}

export function FormActionsToolBar({ mode, disabled, isLoading, onAction }: FormActionsToolBarProps) {
  return (
    <>
      {mode === 'view' && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mx: 'auto', textTransform: 'none' }}
          disabled={disabled}
          size="large"
          onClick={() => onAction('edit')}
        >
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </Button>
      )}
      {mode === 'edit' && (
        <Stack>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="primary"
            sx={{ mx: 'auto', textTransform: 'none' }}
            disabled={isLoading}
            onClick={() => onAction('save')}
            size="large"
          >
            <SaveAsIcon sx={{ mr: 1 }} />
            Save
          </LoadingButton>
          <Button
            variant="contained"
            color="primary"
            sx={{ mx: 'auto', textTransform: 'none' }}
            disabled={disabled}
            onClick={() => onAction('cancel')}
            size="large"
          >
            <CancelIcon sx={{ mr: 1 }} />
            Cancel
          </Button>
        </Stack>
      )}
    </>
  );
}
