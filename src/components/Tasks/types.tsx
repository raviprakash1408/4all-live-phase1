import type { MouseEventHandler } from 'react';

export interface TaskTypes {
  id: number;
  title: string;
  type: string;
  cameraName?: string;
  status?: string;
  creationDate?: number;
  completionDate?: string;
  notification?: boolean;
  // [cameraName: string]: any;
}

export interface AddTaskProps {
  addTask: (newTask: TaskTypes) => void;
  sortedData?: SortedData[];
}

export interface NewTaskCreateTypes {
  addButton?: MouseEventHandler<HTMLButtonElement> | undefined;
  removeButton?: MouseEventHandler<HTMLButtonElement> | undefined;
  toggleButton?: MouseEventHandler<HTMLButtonElement> | undefined;
  props?: string;
  title?: string;
  position?: string;
  width?: string;
  img?: string;
  textColor?: string;
  id?: string;
  timeId?: number;
  day?: string;
  checked?: boolean;
  hour?: number;
  minutes1?: number;
  timePeriod1?: string;
  hour1?: number;
  minutes2?: number;
  timeSelectId?: number;
  timePeriod2?: string;
  updateType?: string;
  showDateSelector?: boolean;
  TimeField?: boolean;
  onToggleChange?: (state: any, payload: boolean) => void;
  updateHour?: (
    id: number | undefined,
    day: any,
    hour: number,
    minutes: number,
    timePeriod: string,
    updateType: string | undefined
  ) => void;
  onTzChanged?: (timezone: string) => void;
  onDateChange?: (date: string) => void;
  onTimeChange?: (date: string) => void;
}

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export interface Hour {
  id: number;
  from_hour: IntRange<1, 13>;
  from_minutes: IntRange<0, 60>;
  from_Am_Pm: 'AM' | 'PM';
  to_hour: IntRange<1, 13>;
  to_minutes: IntRange<0, 60>;
  to_Am_Pm: 'AM' | 'PM';
}

export type Days =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';
export interface Day {
  day: Days;

  enabled: boolean | undefined;
  hours: Hour[];
  error?: {
    message: string;
    type: 'warning' | 'error';
  } | null;
}
export interface NewTaskCreateProps {
  addTask: (task: TaskTypes) => void;
  sortedData?: SortedData[];
}
export interface SortedData {
  id: number;
  title: string;
  type: string;
  cameraName?: string;
  status?: string;
  creationDate?: number;
  completionDate?: string;
  notification?: boolean;
}

export interface Task {
  days: Day[];
  camera: string;
  timezone: string | undefined;
  cameraId: number;
  checkbox: boolean;
  startDate: string;
  endDate: string;
  fromTime: string;
  toTime: string;
}

export interface ToggleButtons {
  handleToggleChange?: (day: any, enabled: boolean) => void;
}

export interface TimeChange {
  updateHour?: (
    id: number,
    day: any,
    hour: number,
    minutes: number,
    timePeriod: string,
    updateType: string
  ) => void;
}
