export interface ProfileItem {
  name: string;
  img: string;
  subImage?: string;
  type: 'normal' | 'logo' | 'team' | 'dropdown';
  url: string;
  label?: string;
}
