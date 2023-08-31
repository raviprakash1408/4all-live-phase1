import Image from 'next/image';
import React from 'react';

const Subscription = () => {
  const sub = [
    {
      id: 1,
      plan_name: 'Basic',
      price: 99,
      button_text: 'Select',
      img: '/assets/icons/Subscription.svg',
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 gap-0">
        {sub.map((item) => (
          <div key={item.id} className="ml-12 w-[84%] cursor-pointer">
            <div className="group mt-10 flex grow flex-col overflow-hidden rounded-2xl border-2 border-solid border-primary-color shadow-lg  duration-300 ease-in-out hover:border-quaternary-color">
              <div className="flex h-28 flex-row justify-center bg-tertiary-color duration-300 ease-in-out group-hover:bg-fifth-color">
                <Image
                  width={0}
                  height={48}
                  src={item.img}
                  alt=""
                  className=" mt-8w-auto mr-6 "
                />
                <span className=" mt-8 text-3xl text-secondary-color">
                  {item.plan_name}
                </span>
              </div>
              <div className="flex h-32 flex-col items-center justify-center bg-fifth-color text-secondary-color duration-300 ease-in-out group-hover:bg-tertiary-color ">
                <span className="text-3xl">
                  $ <span className="text-5xl font-bold">{item.price}</span>
                  <span className="text-2xl ">/mo</span>
                </span>
                <span className=" text-sm group-hover:text-font-color">
                  Save 20% paying annually Annual Subscription{' '}
                </span>
                <div className="flex flex-row duration-200 ease-in-out group-hover:text-font-color">
                  <del className="text-center text-sm">$700</del>{' '}
                  <span className="ml-1 pb-4 text-sm">$590</span>
                </div>
              </div>

              <div className=" bg-tertiary-color p-2 duration-300 ease-in-out group-hover:bg-fifth-color">
                <ul>
                  <li className="ml-2 flex items-center">
                    <Image
                      width={0}
                      height={0}
                      src="/assets/icons/Tick.svg"
                      alt=""
                      className="h-auto w-auto"
                    />
                    <span className="ml-2 text-base italic text-quaternary-color">
                      Velit Omnis Repudiandae
                    </span>
                  </li>
                </ul>
              </div>
              <div className=" flex bg-tertiary-color px-10 pb-10 duration-300 ease-in-out group-hover:bg-fifth-color">
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center rounded-full bg-primary-color px-6 text-sm text-quaternary-color"
                >
                  {item.button_text}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
