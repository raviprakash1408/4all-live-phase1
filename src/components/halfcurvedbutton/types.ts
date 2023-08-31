export interface CurvedButton {
  backgroundColor: string;
  Color: string;
  Color1: string;
  content: string | React.ReactNode;
  height?: string;
  width?: string;
  image: string;
  halfCurved?: boolean;
  curveType?: 'left' | 'right' | 'none';
  size?: 'small' | 'medium' | 'large';
  textProp?: string;
  buttonType?: 'uploadFile' | 'normal';
}
