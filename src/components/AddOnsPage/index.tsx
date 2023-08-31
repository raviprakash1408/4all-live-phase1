import Image from 'next/image';
import React from 'react';

import InputField from '../input field/InputField';
import Toggle from '../toggle button/toggle';

const data = [
  {
    id: 1,
    img: '/assets/MoLink/Settings.svg',
    title: ' Sint nemo aut',
    msg: ' Voluptates ad qui tenetur qui id lo quibusdam iste est et ipsum harum est soluta.',
  },
  {
    id: 2,
    img: '/assets/MoLink/Settings.svg',
    title: 'Speedify',
    msg: ' Voluptates ad qui tenetur qui id lo quibusdam iste est et ipsum harum est soluta.',
  },
  {
    id: 3,
    img: '/assets/MoLink/Settings.svg',
    title: ' Sint nemo aut',
    msg: ' Voluptates ad qui tenetur qui id lo quibusdam iste est et ipsum harum est soluta.',
  },
  {
    id: 4,
    img: '/assets/MoLink/Settings.svg',
    title: ' Sint nemo aut',
    msg: ' Voluptates ad qui tenetur qui id lo quibusdam iste est et ipsum harum est soluta.',
  },
];
const AddOns = () => {
  return (
    <div className="select-none">
      <div className="ml-11 mt-6 w-[201px] text-lg font-semibold text-white">
        Installed AddOns
      </div>
      <div className="ml-8 mt-4 grid w-[85vw] grid-cols-4">
        {data.map((item) => (
          <div key={item.id} className="ml-[6px] flex h-32 ">
            <div className="flex w-[5vw] flex-col rounded-l-[20px] bg-fifth-color">
              <div className="ml-[21px] mt-6 h-[50px] w-[50px] rounded-full bg-tertiary-color">
                <Image
                  width={25}
                  height={25}
                  src={item.img}
                  alt=""
                  className="ml-3 mt-[10px]"
                />
              </div>
              <div className="ml-6 mt-3">
                <Toggle text={false} id="settings" />
              </div>
            </div>

            <div className="flex w-[15vw] flex-col rounded-r-[20px] bg-tertiary-color">
              <div className="ml-5 mt-2 w-[14vw] text-lg font-semibold leading-normal text-white">
                {item.title}
              </div>
              <div className="ml-5 mt-1 h-[62px] w-[14vw] text-base font-normal leading-[18px] text-quaternary-color">
                {item.msg}
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="ml-12 mt-8 w-[94%] border-2 border-tertiary-color" />
      <div className="ml-12 mt-4 flex">
        <div className="w-[201px] text-lg font-semibold text-white">
          Available addons
        </div>
        <div className="ml-36 flex grow items-center justify-center">
          <InputField
            name=""
            validation={false}
            withImage
            height="h-9"
            width="w-[60vw]"
            placeholder="Search addon"
            textMargin="pl-12 "
            bottominput="-bottom-2"
            img="/assets/icons/Search.svg"
            borderColor="border-tertiary-color"
          />
        </div>
      </div>
      <div className="mt-4 flex ">
        <div className="ml-9 h-[55vh] w-[20vw] rounded-[20px] bg-tertiary-color">
          <div className="flex flex-col">
            <div className="ml-5 mt-5 h-[4vh] w-[17vw] rounded-[20px] bg-primary-color pl-4 pt-[6px] text-lg font-semibold leading-normal text-font-color">
              Categories
            </div>
            <div className="ml-8 h-[21vh] w-[254px] text-base font-normal leading-[30px] text-quaternary-color">
              VPN
              <br />
              Connection stats
              <br />
              Speed
              <br />
              Storage
              <br />
              Clouds
              <br />
              Internet
              <br />
              Users
            </div>
            <div className="ml-5 mt-5 h-[4vh] w-[17vw] rounded-[20px] bg-primary-color pl-4 pt-[6px] text-lg font-semibold leading-normal text-font-color">
              Price
            </div>
            <div className="ml-8 h-[21vh] w-[254px] text-base font-normal leading-[30px] text-quaternary-color">
              Free
              <br />
              One time free
              <br />
              Monthly subscription
              <br />
              Yearly subscription
            </div>
          </div>
        </div>
        <div className="grid h-[23rem] w-[65vw] grid-cols-3 gap-x-1 gap-y-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="ml-6 flex  flex-col rounded-[20px]  bg-tertiary-color "
            >
              <div className="flex">
                <div className="ml-7 mt-6">
                  <Image
                    width={70}
                    height={70}
                    src="/assets/icons/Speedify.svg"
                    alt=""
                  />
                </div>
                <div className="ml-4 mt-5 flex flex-col">
                  <div className="text-lg font-semibold leading-normal text-font-color">
                    {item.title}
                  </div>
                  <div className="h-[62px] w-[13vw] text-base font-normal leading-[18px] text-quaternary-color ">
                    {item.msg}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="ml-5 mt-3 h-10 rounded-[25px] bg-secondary-color text-center text-lg font-semibold text-font-color xl:w-[14vw] 2xl:w-[18vw]"
              >
                Price
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddOns;
