import { CSSProperties } from 'react';
export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}