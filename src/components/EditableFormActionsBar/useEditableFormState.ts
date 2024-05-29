import { EditableFormViewMode } from '@components/EditableFormActionsBar/EditableFormActionsBar';
import { useState } from 'react';

export const useEditableFormState = ({ isLoading }: { isLoading: boolean }) => {
  const [viewMode, setViewMode] = useState<EditableFormViewMode>('view');
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
