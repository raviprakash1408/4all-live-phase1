import React from 'react';

import { CustomizedSelect } from '../CustomizedSelect';
import Toggle from '../toggle button/toggle';

const Options = () => {
  const ToggleOptions = [
    { id: 1, options: 'Force output file format.' },
    { id: 2, options: 'Overwrite output files without asking.' },
    {
      id: 3,
      options:
        'Do not overwrite output files, and exit immediately if a specified output file already exists.',
    },
    { id: 4, options: 'Send program-friendly progress information to stdout.' },
    { id: 5, options: 'Suppress printing banner.' },
    {
      id: 6,
      options:
        'Dump full command line and log output to a file named program-YYYYMMDD-HHMMSS.log in the current directory.',
    },
  ];
  return (
    <div className="mb-2  mt-6 ">
      <div className="ml-8">
        <div className="ml-2 text-lg font-semibold text-white">Extra flags</div>
        <div className="mt-5">
          {ToggleOptions.map((item) => (
            <div key={item.id} className="flex ">
              <div className="mt-[6px]">
                <Toggle text={false} id={`${item.id}`} />
              </div>
              <div className="ml-4 font-normal leading-[35px] text-quaternary-color sm:text-[15px] lg:w-96 lg:text-sm 2xl:w-full 2xl:text-base">
                {item.options}
              </div>
            </div>
          ))}
          <div className="mt-6">
            <CustomizedSelect
              width="w-72"
              height="h-[38px]"
              title="Log level"
              border="rounded-full"
              initialSelect="Log level"
              arrowBottom="top-[12px]"
              textcolor="text-font-color"
              textMarginLeft="pl-[5px]"
              marginTop="mt-[-5px]"
              // options={options}
              borderColor="border-tertiary-color group-hover:border-quaternary-color"
            />
          </div>
        </div>
        <div />
      </div>
      <hr className=" mb-[15px] mt-4 w-[64vw] border-[1px] border-tertiary-color" />

      <div className="ml-8">
        <div className="ml-2 text-lg font-semibold text-white">FFmpegd</div>
        <div className="mt-5">
          <div className="flex ">
            <div className="mt-[6px]">
              <Toggle text={false} id="FFmpegd" />
            </div>
            <div className="ml-4 font-normal leading-[35px] text-quaternary-color sm:text-[15px] lg:text-sm 2xl:text-base">
              Enable sending encode jobs to FFmpegd (experimental). FFmpegd must
              be running to connect.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
