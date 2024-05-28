import { useCallback, useState } from 'react';

export type UseModalStateProps = { visibleInitial?: boolean };
export type UseModalStateResult = { visible: boolean; show: () => void; close: () => void };

export const useModalState = ({ visibleInitial = false }: UseModalStateProps = {}): UseModalStateResult => {
  const [visible, setVisible] = useState(visibleInitial);
  return { visible, show: useCallback(() => setVisible(true), []), close: useCallback(() => setVisible(false), []) };
};
