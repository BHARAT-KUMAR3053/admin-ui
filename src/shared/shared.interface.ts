import { ReactNode } from 'react';

export interface IResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  edit?: boolean;
  checked?: boolean;
}

export interface IReduxState {
  landing: IResponse[];
}

export interface IAlertTypes {
  [key: string]: string;
  success: string;
  error: string;
  warning: string;
}

export interface IButtonProps {
  label?: string | ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  id?: string;
  className?: string;
  role?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event?: any) => void;
  disabled?: boolean;
  testId?: string;
}
