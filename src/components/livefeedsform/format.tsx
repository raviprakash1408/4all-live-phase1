import React from 'react';

import InputField from '../input field/InputField';

const FormatOptions = () => {
  return (
    <div>
      <div className="ml-8 mt-8 flex">
        <div>
          <InputField
            textMargin="pl-2"
            name="Container"
            value="M4S"
            validation={false}
            withImage={false}
            bottominput="-top-4"
            height="h-[38px]"
            width="2xl:w-96 lg:w-64"
            borderColor="border-tertiary-color"
          />
        </div>
        <div className="ml-6">
          <InputField
            name="Clip"
            textMargin="pl-2"
            value="None"
            validation={false}
            withImage={false}
            bottominput="-top-4"
            height="h-[38px]"
            width="2xl:w-96 lg:w-64"
            borderColor="border-tertiary-color"
          />
        </div>
      </div>
    </div>
  );
};

export default FormatOptions;
