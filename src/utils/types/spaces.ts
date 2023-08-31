export interface Spaces {
  id: number;
  name: string;
  menu_logo: string;
  main_logo: string;
  slug: string;
  event_mode: boolean;
  event_start: string;
  event_end: string;
  public_mode: boolean;
  is_lobby: boolean;
  lobby_type: 'C' | 'I' | 'V';
  lobby_image: string;
  lobby_video: string;
  subroom_count: number;
  background_image: string;
  add_password: boolean;
  friendly_url: string;
  password_text: string;
  auto_start_space: boolean;
  default_viewer_type: 'V' | 'P' | 'S';
  hidden_user_present_as: 'P' | 'S';
  override_theme: boolean;
  light_theme: object;
  dark_theme: object;
}
export interface Subspace {
  auto_start_space: boolean;
  id: number;
  is_lobby: boolean;
  is_master: boolean;
  name: string;
  room_slug: string;
  slug: string;
}
