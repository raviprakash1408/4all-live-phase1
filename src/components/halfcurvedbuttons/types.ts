export interface CurvedButton {
  height?: string;
  width?: string;
  content: string | React.ReactNode;
  image?: string;
  halfCurved?: boolean;
  curveType?: 'left' | 'right' | 'none';
  size?: 'small' | 'medium' | 'large';
  textProp?: string;
  textcolor?: string;
  backgroundColor?: string;
  imgcolor?: string;
  textsize?: string;
}
