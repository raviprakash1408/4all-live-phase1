export interface LoginType {
  name: string;
  img: string;
  subImage?: string;
  // type: 'normal' | 'logo' | 'team';
  // url: string;
  placeholder: string;
  imgCursor?: string;
  error?: string;
  errorBorder?: string;
  enableBlur: boolean;
  dataType?: string;
  email?: string;
  username: string;
}
