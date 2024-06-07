import { EditableFormViewMode } from '@components/EditableFormActionsBar/EditableFormActionsBar';
import { useState } from 'react';

export const useEditableFormState = ({
  initialState,
  isLoading,
}: {
  isLoading: boolean;
  initialState?: EditableFormViewMode;
}) => {
  const [viewMode, setViewMode] = useState<EditableFormViewMode>(initialState ?? 'view');
  const [isSaving, setIsSaving] = useState(isLoading);

  const isBusy = isLoading || isSaving;
  const isReadonly = viewMode === 'view';

  return {
    isBusy,
    isReadonly,
    setIsSaving,
    viewMode,
    setViewMode,
  };
};
