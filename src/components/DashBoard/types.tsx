export interface Dashboard {
  title: string;
  img: string;
  width?: string;
  height?: string;
  borderLeft?: string;
  borderRight?: string;
  border?: string;
  data?: string[] | number[];
  arrowBottom?: string;
  cpu_percent?: number | undefined;
  gpuLoad?: number | undefined;
  memory_usage?: number | undefined;
  upTime?: string | undefined;
  // subImage?: string;
  // type: 'normal' | 'logo' | 'team';
  // url: string;
  // backgroundColor: string;
  // rotate: string;
  // width: string;
}
export interface SystemInfo {
  cpu_percent: number;
  memory_usage: {
    total: number;
    available: number;
    used: number;
    percent: number;
  };
  storage_usage: {
    total: string;
    used: string;
    free: number;
    percent: number;
  };
}
