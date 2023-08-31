export interface LiveSettings {
  name?: string;
  key?: string;
  input_type?: string;
  options?: Option[];
  value?: string;
  key_word?: string;
  id?: number | null;
  selectedId?: number | null;
  onSelectedIdChange?: (id: number | null) => void | undefined;
  deviceName?: string;
  input_url?: string;
  preview_url?: string;
  storage_path?: string;
  newCamera?: boolean;
  inputValue?: string;
  onInputValueChange?: (value: string) => void;
  setInputTitle?: React.Dispatch<React.SetStateAction<string>>; // Add this prop
  setCameraName?: (value: string) => void; // Add this prop
  onLoadingChange?: (value: boolean) => void;
  addCamera?: boolean;
  setAddCamera?: (newValue: boolean) => void;
  onNewLiveChange?: (newLiveValue: boolean) => void;
  newLive?: boolean; // Make sure newLive is properly typed as boolean
  onErrorChange?: (childError: string) => void;
  onResetFromChild?: (resetValue: boolean) => void;
  onDataUpdated?: (value: boolean) => void;
}

export interface CameraName {
  id?: number | null;
  cameraName?: string;
  rtsp_link?: string;
  ping_link?: string;
  storage_path?: string;
}

export interface CameraFormFields {
  name?: string;
  rtsp_url?: string;
  ping_url?: string;
  storage_path?: string;
  rtsp_offline?: boolean;
  device_offline?: boolean;
}
interface Option {
  id: number;
  name: string;
}
