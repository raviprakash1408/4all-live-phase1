export interface CurvedButton {
  content: string | React.ReactNode;
  height: string;
  width: string;
  image?: string;
  halfCurved?: boolean;
  curveType?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  backgroundColor: string;
  imgcolor?: string;
  textcolor?: string;
  textsize?: string;
  hoverbgColor?: string;
  hoverColor?: string;
  textHover?: string;
  imghover?: string;
}
export interface DemoButton {
  hoverbgColor?: any;
  height: string;
  halfCurved?: boolean;
  curveType?: 'left' | 'right';
  backgroundColor: string;
  children?: React.ReactNode;
}
