export interface ToastType {
  heading?: string;
  message?: string;
  type?: 'success' | 'warning' | 'error';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose?: () => void;
}
