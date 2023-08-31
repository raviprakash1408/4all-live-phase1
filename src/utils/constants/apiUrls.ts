const MAIN_HOST_IP = 'http://localhost';
// const MAIN_HOST_IP = 'http://192.168.50.84';
export const MAIN_URL = `${MAIN_HOST_IP}:9000/api/v1/`;
export const CAMERA_LIST = 'cameras?is_active=true';
export const INTERNET_LOGS =
  'logs?limit=100&offset=0&log_type=internet_connection_check';
export const CAMERA_CHECK_LOGS = 'logs?limit=1&offset=0&log_type=camera_check';
export const NAS_STORAGE_LOGS =
  'logs?limit=100&offset=0&log_type=nas_storage_check';
export const MP4_GENERATION_LOGS =
  'logs?limit=100&offset=0&log_type=mp4_generation_process';
export const LIVE_RECORDING_LOGS =
  'logs?limit=100&offset=1&log_type=live_recording_process';
export const VIDEOJS_PLAYER_URL = `${MAIN_HOST_IP}:8888/`;
export const LIVE_RECORDING_SETTINGS_CREATE =
  'live_recording_settings?skip=0&limit=100';
export const GET_FOLDER_URL = 'get/folder/';
export const GET_FILES_URL = 'get_file/';
export const GET_SYSTEM_INFO = 'get_system_info';
export const CAMERA_NAME_CHECK = 'camera/name/check?name=';
export const STOP_LIVE_RECORDING = 'live_recording/stop';
export const TASK_LIST = 'task-manager?skip=0&limit=100';
export const TASK = 'task-manager';
