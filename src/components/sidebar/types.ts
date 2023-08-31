export interface MenuItem {
  name: string;
  img: string;
  subImage?: string;
  type: 'normal' | 'logo' | 'team';
  url: string;
}
