export interface SelectTypes {
  name: string;
  img: string;
  options?: string[];
  value?: string;
  imgCursor?: string;
  onChange?: (value: string) => void;
}
