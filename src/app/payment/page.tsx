import React from 'react';

import { HalfCurvedButtons } from '@/components';
import InputField from '@/components/input field/InputField';
import Toggle from '@/components/toggle button/toggle';

const PaymentPage = () => {
  return (
    <div>
      <div className="mt-8 text-center font-semibold text-font-color ">
        Payment Method
      </div>
      <div className="ml-[40%] mt-6 ">
        <div className="ml-12 h-20 w-[19rem] select-none rounded-xl border-2 border-secondary-color bg-primary-color pt-[1.4rem] text-center text-base font-semibold text-quaternary-color">
          Pay with Credit Card
        </div>
      </div>
      <div className="ml-[30%]">
        <InputField
          name="Credit Card Number"
          validation={false}
          withImage={false}
          width="w-[45rem]"
          height=""
          borderColor="border-tertiary-color"
        />
      </div>
      <div className="ml-[30%]">
        <InputField
          name="Card Holder Name"
          validation={false}
          withImage={false}
          width="w-[45rem]"
          height=""
          borderColor="border-tertiary-color"
        />
      </div>
      <div className="ml-[30%] mt-[-20px] flex ">
        <div className="">
          <InputField
            name="Expiration Date"
            validation={false}
            withImage={false}
            width="w-[21rem]"
            height=""
            borderColor="border-tertiary-color"
          />
        </div>
        <div>
          <InputField
            name="CCV"
            validation={false}
            withImage={false}
            width="w-[21rem]"
            height=""
            borderColor="border-tertiary-color"
          />
        </div>
      </div>
      <div className="ml-[30%] mt-[-20px]">
        <InputField
          name="Billing Address"
          validation={false}
          withImage={false}
          width="w-[45rem]"
          height=""
          borderColor="border-tertiary-color"
        />
      </div>
      <div className="ml-[33%] flex ">
        <span className="text-quaternary-color">Set Default</span>
        <div className="ml-4">
          <Toggle text={false} id="Set Default" />
        </div>
      </div>
      <div className="ml-[36%] mt-28 flex">
        <div>
          <HalfCurvedButtons
            content="Back"
            height=""
            width="w-[15rem]"
            backgroundColor="bg-primary-color"
            textcolor="text-quaternary-color text-base "
            textsize="ml-[33%]"
          />
        </div>
        <div className="ml-[2%]">
          <HalfCurvedButtons
            content="Subscribe Now 699$"
            height=""
            width="w-[15rem]"
            backgroundColor="bg-secondary-color"
            textcolor="text-font-color text-base "
            textsize="ml-[15%]"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
