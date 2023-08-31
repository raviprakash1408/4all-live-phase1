// 'use client';

import { useState } from 'react';

import InputField from '../input field/InputField';
import type { InputItem } from '../input field/types';
import SelectInputField from '../SelectInputField';
import type { DropdownItem } from './types';

const item1: InputItem = {
  name: 'Space Name',
  img: '/assets/sidebar/spaces.svg',
  validation: false,
  withImage: false,
  width: '',
  height: '',
  borderColor: 'border-tertiary-color',
};
const Dropdown = ({ item }: { item: DropdownItem }) => {
  const [inputTitle, setInputTitle] = useState('');
  return (
    <div className="rounded-lg border-2 border-solid border-tertiary-color border-t-primary-color">
      {inputTitle ? '' : ''}
      <div>
        <h1 className=" ml-5 p-4 text-start text-lg font-semibold text-font-color">
          {item?.title}
        </h1>
        <hr className=" ml-4 w-[98%] border border-tertiary-color" />

        <div className="grid grid-cols-2">
          <InputField
            name={item1.name}
            img={item1.img}
            validation={false}
            withImage={false}
            width=""
            height=""
            borderColor="border-tertiary-color"
          />
          <InputField
            name={item1.name}
            img={item1.img}
            validation={false}
            withImage={false}
            width=""
            height=""
            borderColor="border-tertiary-color"
          />
        </div>
        <SelectInputField
          onChange={(selectedValue) => {
            setInputTitle(selectedValue);
          }}
          MarginTop="mt-[3px]"
          title="name"
          width="w-48"
        />
      </div>
    </div>
  );
};

export default Dropdown;
