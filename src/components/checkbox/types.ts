export interface CheckBoxTypes extends React.HTMLAttributes<HTMLElement> {
  type: 'Square' | 'Circle';
  button?: boolean;
  onClick?: () => void;
  id: string;
  backgroundColor: string;
  checked?: boolean; // Add this line
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
