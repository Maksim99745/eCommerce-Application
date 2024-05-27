import { Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';
import { LoadingButton } from '@mui/lab';

export type EditableFormAction = 'edit' | 'cancel';
export type EditableFormViewMode = 'view' | 'edit';
export interface FormActionsToolBarProps {
  mode: EditableFormViewMode;
  disabled?: boolean;
  isLoading?: boolean;
  onAction: (action: EditableFormAction) => void;
  children?: React.ReactNode;
}

export function EditableFormActionsBar({ mode, disabled, isLoading, children, onAction }: FormActionsToolBarProps) {
  return (
    <>
      {mode === 'view' && (
        <LoadingButton
          variant="contained"
          color="primary"
          loading={isLoading}
          sx={{ textTransform: 'none' }}
          disabled={disabled}
          size="small"
          onClick={() => onAction('edit')}
        >
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </LoadingButton>
      )}
      {mode === 'edit' && (
        <Stack direction="row" spacing={1}>
          {children}
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="primary"
            type="submit"
            sx={{ textTransform: 'none' }}
            disabled={isLoading}
            size="small"
          >
            <SaveAsIcon sx={{ mr: 1 }} />
            Save
          </LoadingButton>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: 'none', ml: '5px' }}
            disabled={isLoading}
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
