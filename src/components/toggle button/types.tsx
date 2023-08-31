export interface ToggleType {
  text: boolean;
  id: string;
  onClick?: any;
  state?: string;
  button?: boolean;
  disabledColor?: string;
  textType?: 'Enable' | 'On';
  checked?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
}
