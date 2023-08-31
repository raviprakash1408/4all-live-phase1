export interface SelectTypes1 {
  title?: string;
  img?: string;
  width: string;
  height?: string;
  borderLeft?: string;
  borderRight?: string;
  border?: string;
  data?: string[] | number[];
  arrowBottom?: string;
  textcolor?: string;
  defaultvalue?: string;
  textMarginLeft?: string;
  marginTop?: string;
  options?: Option[] | undefined;
  onSelectOption?: (option: string) => void;
  imgHeight?: string;
  initialSelect?: string | undefined;
  borderColor?: string;
  rtspLink?: string;
}
interface Option {
  id: number;
  name: string;
}
