export interface InputItem {
  name: string | undefined;
  img?: string;
  subImage?: string;
  // type: 'normal' | 'logo' | 'team';
  // url: string;
  placeholder?: string;
  imgCursor?: string;
  error?: string;
  errorBorder?: string;
  validation: boolean;
  withImage: boolean;
  height: string;
  width: string;
  bottominput?: string;
  value?: string | undefined;
  onChange?: any;
  textMargin?: string;
  borderColor: string;
}
