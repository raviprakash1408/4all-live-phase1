export interface MenuItem {
  img?: string;
  subImage?: string;
  backgroundColor?: string;
  content?: string;
  hoverbgcolor?: string;
  topCurved?: boolean;
  curveType?: 'left' | 'right' | 'both';
  height?: string;
  width?: string;
  children?: React.ReactNode;
}
