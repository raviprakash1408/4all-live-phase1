import type { Hour } from '@/components/NewTask/types';

const convertToMinutes = (
  hour: number,
  minute: number,
  period: string
): number => {
  let totalMinutes = 0;
  let h = hour;
  if (period === 'PM' && h !== 12) {
    h += 12;
  } else if (period === 'AM' && h === 12) {
    h = 0;
  }
  totalMinutes = h * 60 + minute;
  return totalMinutes;
};

const isHourConflict = (currentHour: Hour, hour: Hour): boolean => {
  const currentFromTime = convertToMinutes(
    currentHour.from_hour,
    currentHour.from_minutes,
    currentHour.from_Am_Pm
  );
  const currentToTime = convertToMinutes(
    currentHour.to_hour,
    currentHour.to_minutes,
    currentHour.to_Am_Pm
  );
  const fromTime = convertToMinutes(
    hour.from_hour,
    hour.from_minutes,
    hour.from_Am_Pm
  );
  const toTime = convertToMinutes(hour.to_hour, hour.to_minutes, hour.to_Am_Pm);
  return (
    (currentFromTime >= fromTime && currentFromTime < toTime) ||
    (currentToTime > fromTime && currentToTime <= toTime)
  );
};

export { convertToMinutes, isHourConflict };
