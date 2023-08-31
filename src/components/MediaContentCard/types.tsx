export interface ButtonType {
  // id: number;
  name?: string;
  type?: 'image' | 'media' | 'audio' | 'document' | 'notes';
  img?: string;
  title?: string;
  fileSize?: string;
  id?: number | undefined;
  URL?: string;
  playVideo?: string;

  // price: number;
  // button_text: string;
  // img: string;
  // bgColor: string;
}
