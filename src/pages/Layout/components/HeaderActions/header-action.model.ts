import { ReactNode } from 'react';

export interface HeaderAction {
  key: string;
  to: string;
  startIcon: ReactNode;
  text: string;
  onClick: () => void;
  buttonStyle: object;
  menuItemStyle: object;
  show: boolean;
  menuOrder: number;
}
