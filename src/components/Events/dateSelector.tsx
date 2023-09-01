import 'react-datepicker/dist/react-datepicker.css';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import type { NewTaskCreateTypes } from './types';

const DateSelector = (props: NewTaskCreateTypes) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const datePickerRef = useRef<DatePicker | null>(null);

  const handleTimeChange = (time: Date) => {
    setSelectedDate(time);
    if (props.onTimeChange) {
      const formattedTime = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Include AM/PM indicator
      });

      props.onTimeChange(formattedTime);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      const formattedDate = date.toLocaleDateString('en-US', options);
      const [dateString, timeString] = formattedDate.split(', ');
      if (dateString) {
        const [month, day, year] = dateString.split('/');
        const customFormattedDate = `${day}-${month}-${year}`;
        if (props.onDateChange && props.onTimeChange) {
          props.onDateChange(customFormattedDate);
          props.onTimeChange(timeString ?? '');
        }
      }
    }
  };
  const handleImageClick = () => {
    if (datePickerRef.current) {
      if (!datePickerOpen) {
        setDatePickerOpen(true);
        datePickerRef.current.setOpen(true);
      } else {
        datePickerRef.current.setOpen(false);
        setTimeout(() => {
          setDatePickerOpen(false);
        }, 1000);
      }
    }
  };

  const showTimeField = props.TimeField;

  return (
    <div>
      {props.showDateSelector ? (
        <div className="relative flex items-center">
          <DatePicker
            selected={selectedDate}
            ref={datePickerRef}
            onChange={handleDateChange}
            showTimeSelect={showTimeField}
            timeFormat="h:mm aa"
            timeIntervals={1}
            timeCaption="Time"
            placeholderText={
              showTimeField ? '29/12/2023 - 11:30 pm' : '29/12/2023'
            }
            className="h-10 w-[17rem] rounded-full border-2 border-tertiary-color bg-primary-color p-2 text-base text-font-color focus:outline-none"
          />
          <button type="button" onClick={handleImageClick}>
            <Image
              width={19}
              height={20}
              src="/assets/icons/event mode calentar.svg"
              alt=""
              className="absolute right-3 top-[10px]"
              draggable={false}
            />
            {selectedDate && showTimeField && (
              <div className="absolute right-[92px] top-[9px] text-base text-font-color">
                -{' '}
                {selectedDate.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            )}
          </button>
        </div>
      ) : (
        <div className="relative flex items-center">
          <DatePicker
            ref={datePickerRef}
            selected={null}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeFormat="h:mm aa"
            timeIntervals={1}
            timeCaption="Time"
            // placeholderText="Select Time"
            className="h-10 w-[17rem] rounded-full border-2 border-tertiary-color bg-primary-color p-2 text-base text-font-color focus:outline-none"
          />
          <button type="button" onClick={handleImageClick}>
            <Image
              width={0}
              height={0}
              src="/assets/icons/event mode calentar.svg"
              alt=""
              className="absolute right-3 top-[10px] h-auto w-auto"
              draggable={false}
            />
            {selectedDate && showTimeField && (
              <div className="absolute left-3 top-[9px] text-base text-font-color">
                {selectedDate.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
