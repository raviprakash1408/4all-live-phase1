import React from 'react';

import Checkbox from '@/components/checkbox/checkbox';
import InputField from '@/components/input field/InputField';
import NumberInput from '@/components/NumberInput/index';
import PasswordField from '@/components/password field/index';
import { Select } from '@/components/select/index';
import Toggle from '@/components/toggle button/toggle';

import CopyButton from '../copyButton';
import { CustomizedSelect } from '../CustomizedSelect';
// import InputItem from '../try';

const Form = () => {
  const Address = {
    InputField: "import InputField from '@/components/input field/InputField'",
    Arrow: "import Arrow from '@/components/arrow/arrow'",
    CheckBox: "import Checkbox from '@/components/checkbox/checkbox'",
    Select: "import { Select } from '@/components/Select/index'",
    Toggle: "import Toggle from '@/components/toggle button/toggle'",
    Password: "import PasswordField from '@/components/password field/index",
    NumberInput: "import NumberInput from '@/components/NumberInput/index'",
    CustomizedSelect: "import { CustomizedSelect } from '../CustomizedSelect'",
  };
  return (
    <div className="">
      <form action="">
        <div className="flex">
          <InputField
            name="Input"
            img="/assets/sidebar/spaces.svg"
            validation={false}
            withImage={false}
            height="h-8"
            width="w-8"
            borderColor="border-tertiary-color"
          />
          <InputField
            name=""
            img="/assets/icons/Search.svg"
            placeholder="Search Files"
            imgCursor="cursor-pointer"
            errorBorder="border-quaternary-color"
            validation={false}
            withImage={false}
            height="h-8"
            width="w-8"
            borderColor="border-tertiary-color"
          />
          <InputField
            name=""
            error="Please enter a value"
            img="/assets/icons/Search.svg"
            placeholder="Search Files"
            imgCursor="cursor-pointer"
            errorBorder="border-red-500"
            validation
            withImage={false}
            height=""
            width=""
            borderColor="border-tertiary-color"
          />

          {/* <InputItem /> */}
        </div>
        <div className="flex">
          <p className="ml-8 text-quaternary-color">Input Field</p>
          <CopyButton text={Address.InputField} />
        </div>

        <br />
        <hr className=" ml-4 w-[98%] border border-tertiary-color" />

        <br />
        <div>
          <NumberInput
            name="Max number of Participants"
            img="/assets/sidebar/Group.svg"
          />
        </div>
        <div className="mt-11 flex">
          <p className="ml-8 text-quaternary-color">Number Input</p>
          <CopyButton text={Address.NumberInput} />
        </div>
        <br />
        <hr className=" ml-4 w-[98%] border border-tertiary-color" />

        <br />
        <div>
          <PasswordField
            name="Space Password"
            img="/assets/icons/Password.svg"
            type="all"
          />
        </div>
        <div className="mt-11 flex">
          <p className="ml-8 text-quaternary-color">Password Field</p>
          <CopyButton text={Address.Password} />
        </div>

        <br />
        <hr className=" ml-4 w-[98%] border border-tertiary-color" />

        <br />
        <div className="ml-8 text-quaternary-color">
          <Toggle text={false} id="form" />
        </div>
        <div className="mt-2 flex">
          <p className=" ml-8 text-quaternary-color">Toggle</p>
          <CopyButton text={Address.Toggle} />
        </div>
        <br />
        <hr className=" ml-4 w-[98%] border border-tertiary-color" />

        <br />

        <div className="ml-8 text-quaternary-color">
          <Checkbox
            backgroundColor="bg-primary-color"
            id="form"
            type="Square"
          />
        </div>
        <div className="mt-2 flex">
          <p className="ml-8 text-quaternary-color">Checkbox</p>
          <CopyButton text={Address.CheckBox} />
        </div>

        <br />
        <hr className=" ml-4 w-[98%]  border border-tertiary-color" />

        <br />
        <div className="ml-4">
          <CustomizedSelect
            img="/assets/icons/Camera.svg"
            width="w-60"
            height="h-9"
            arrowBottom="top-[31.5%]"
            border="rounded-full"
            borderColor="border-tertiary-color group-hover:border-quaternary-color"
          />
        </div>
        <div className="mt-2 flex">
          <p className="ml-8 text-quaternary-color">CustomizedSelect</p>
          <CopyButton text={Address.CustomizedSelect} />
        </div>
        <br />
        <hr className=" ml-4 w-[98%] border border-tertiary-color" />

        <br />

        <div className="ml-8 text-quaternary-color">
          <Select name="SDI" img="/assets/icons/Camera.svg" />
        </div>
        <div className="mt-2 flex">
          <p className="ml-8 text-quaternary-color">Select</p>
          <CopyButton text={Address.Select} />
        </div>
        <br />
        <hr className=" ml-4 w-[98%] border border-tertiary-color" />
      </form>
    </div>
  );
};

export default Form;
