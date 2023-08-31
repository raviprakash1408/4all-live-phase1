export interface CustomFile {
  type: 'image' | 'media' | 'audio' | 'document' | 'notes';
  name: string;
  url: string;
  size: number;
  created_at: string;
  updated_at: string;
  folder_id: number;
  // Optional properties
  id: number;
  space_id?: number;
  user_id?: number;
  team_id: number;
  is_public: boolean;
  is_active: boolean;
  folderName?: string | null;
  path?: string | null;
}

export interface Folder {
  id: number;
  name: string;
  parent_id: number;
  space_id: number;
  user_id: number;
  team_id: number;
  is_public: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
