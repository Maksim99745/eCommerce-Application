import { Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';
import { LoadingButton } from '@mui/lab';

export type EditableFormAction = 'edit' | 'cancel' | 'save';
export type EditableFormViewMode = 'view' | 'edit';

const EditableFormActionsBarButtonStyles = { textTransform: 'none' };
export interface FormActionsToolBarProps {
  mode: EditableFormViewMode;
  disabled?: boolean;
  isLoading?: boolean;
  onAction: (action: EditableFormAction) => void;
}

export function EditableFormActionsBar({ mode, disabled, isLoading, onAction }: FormActionsToolBarProps) {
  return (
    <>
      {mode === 'view' && (
        <LoadingButton
          variant="contained"
          color="primary"
          loading={isLoading}
          sx={EditableFormActionsBarButtonStyles}
          disabled={disabled}
          size="small"
          onClick={() => onAction('edit')}
        >
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </LoadingButton>
      )}
      {mode === 'edit' && (
        <Stack direction="row">
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            color="primary"
            sx={EditableFormActionsBarButtonStyles}
            disabled={isLoading}
            onClick={() => onAction('save')}
            size="small"
          >
            <SaveAsIcon sx={{ mr: 1 }} />
            Save
          </LoadingButton>
          <Button
            variant="contained"
            color="primary"
            sx={{ ...EditableFormActionsBarButtonStyles, ml: '5px' }}
            disabled={disabled}
            onClick={() => onAction('cancel')}
            size="small"
          >
            <CancelIcon sx={{ mr: 1 }} />
            Cancel
          </Button>
        </Stack>
      )}
    </>
  );
}
