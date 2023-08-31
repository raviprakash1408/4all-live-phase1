import { VIDEOJS_PLAYER_URL } from './constants/apiUrls';

export const preventDefault = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
};

export const getStreamIdFromRtspUrl = (url: string | undefined | null) => {
  const validUrl = url ?? '';
  const urlParts = validUrl.split('/');
  return urlParts[urlParts.length - 1];
};

export const getHlsVideoUrl = (camera: any) => {
  const cameraName = camera?.slug?.replace(/\s/g, '');
  const hlsUrl: any = `${VIDEOJS_PLAYER_URL}${cameraName}`;
  return hlsUrl;
};
