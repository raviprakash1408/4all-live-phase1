import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import type { ITimezoneOption } from 'react-timezone-select';
import TimezoneSelect, { allTimezones } from 'react-timezone-select';
import spacetime from 'spacetime';

// import spacetime from 'spacetime';
import type { NewTaskTypes } from './types';

const Timezone = (New: NewTaskTypes) => {
  const [tz, setTz] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [datetime, setDatetime] = useState(spacetime.now());

  useEffect(() => {
    setDatetime(datetime.goto(tz));
    if (New.onTzChanged) {
      New.onTzChanged(tz);
    }
  }, [tz]);
  // console.log(tz);

  return (
    <div className="relative mt-1">
      {/* <span className="pointer-events-none absolute bottom-8 ml-4 flex-1  p-1 text-sm  text-quaternary-color">
        Timezone
      </span> */}
      <TimezoneSelect
        className="custom-timezone-select"
        value={tz}
        onChange={(timezone: ITimezoneOption) => setTz(timezone.value)}
        labelStyle="altName"
        timezones={{
          ...allTimezones,
          'America/Lima': 'Pittsburgh',
          'Europe/Berlin': 'Frankfurt',
        }}
      />
      <Image
        width={19}
        height={19}
        alt="timezone"
        src={New.img ? New.img : ''}
        className="absolute left-3 top-[11px]"
      />
    </div>
  );
};

export default Timezone;
