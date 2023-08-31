export interface SpaceGridType {
  // spaceGridItems: any;

  // content: string;
  // content2?: string;
  id?: number | null;
  CameraName?: string;
  img?: string;
  name?: string | null;
  input_url?: string | null | undefined;
  preview_url?: string | null;
  playable_preview_url?: string;
  storage_path?: string | null;
  saveButton?: boolean;
  slug?: string | null | undefined;
}
export interface Camera {
  SpaceGridTypes?: SpaceGridType[];
  height?: string;
  width?: string;
  type: 'livefeeds' | 'dashboard';
  onItemSelected?: (
    id?: number | null,
    name?: string | null | undefined,
    input_url?: string | null | undefined,
    preview_url?: string | null,
    storagePath?: string | null | undefined,
    slug?: string | null | undefined
  ) => void;
  selectedId?: number | null;
  saveButton?: boolean;
  deleteButton?: boolean;
  name?: string;
  videoUrl?: string;
  newLiveFeed?: boolean;
  loading?: boolean;
  validUrl?: string;
  resetButton?: boolean;
  dataUpdate?: boolean;
}
