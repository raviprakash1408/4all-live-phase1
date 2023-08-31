'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import IncreaseCount from './IncreaseCount';

const AddtoCartGrid = () => {
  const [add, setAdd] = useState(0);

  const Hardware = [
    {
      id: 1,
      DeviceCompany: 'MoBox',
      DevicePrice: 699,
    },
    {
      id: 2,
      DeviceCompany: 'MoBox',
      DevicePrice: 6999,
    },
    {
      id: 3,
      DeviceCompany: 'MoBox',
      DevicePrice: 699,
    },
    {
      id: 4,
      DeviceCompany: 'MoBox',
      DevicePrice: 699,
    },
  ];
  return (
    <div>
      <div className="ml-[10%] grid grid-cols-2 gap-0">
        {Hardware.map((item) => (
          <div
            key={item.id}
            className="group relative mt-4 flex h-56 w-[37rem] select-none flex-row rounded-3xl border-2 border-primary-color bg-tertiary-color duration-300 ease-in-out hover:border-secondary-color hover:bg-fifth-color"
          >
            <div className="absolute ml-2 mt-3 h-[86%] w-[34%] rounded-3xl bg-primary-color duration-300 ease-in-out group-hover:bg-secondary-color" />
            <Image
              width={135}
              height={219}
              src="/assets/images/MOBOX 1.png"
              alt=""
              className="absolute ml-6 "
            />
            <div className="select-none">
              <h1 className=" absolute ml-[59%] mt-3 text-center text-base font-semibold text-quaternary-color duration-300 ease-in-out group-hover:text-font-color">
                {item.DeviceCompany}
              </h1>
              <span className="absolute ml-[57%] mt-10 text-sm text-quaternary-color duration-300 ease-in-out group-hover:text-secondary-color">
                Price: ${item.DevicePrice}
              </span>
              <span className="absolute ml-[53%] mt-14 text-sm text-quaternary-color">
                One time purchase
              </span>
              <span className="absolute ml-[34%] mt-24 px-9 text-center text-sm text-quaternary-color">
                Laborum ipsa fuga nisi. Repudiandae perspiciatis voluptatibus,
                Mepudiandae perspiciatis voluptatibus.
              </span>

              {add !== item.id && (
                <button
                  type="button"
                  onClick={() => {
                    setAdd(item.id);
                  }}
                  className="absolute ml-[50%] mt-44 h-8 w-[9.5rem] rounded-full bg-primary-color text-sm text-quaternary-color duration-300 ease-in-out group-hover:bg-secondary-color group-hover:text-font-color"
                >
                  Add
                </button>
              )}

              {add === item.id && (
                <>
                  <IncreaseCount price={item.DevicePrice} />
                  <button
                    type="button"
                    onClick={() => setAdd(0)}
                    className="absolute ml-[72%] mt-44 h-8 w-28 rounded-full bg-primary-color text-sm text-quaternary-color duration-300 ease-in-out group-hover:bg-secondary-color group-hover:text-font-color"
                  >
                    X <span className="ml-2"> Clear</span>
                  </button>
                </>
                // <div>
                //   <div className="absolute ml-[40%] mt-44 h-8 w-40 rounded-full bg-primary-color text-sm text-quaternary-color  group-hover:text-font-color">
                //     <button
                //       type="button"
                //       onClick={() => setCount(count - 1)}
                //       className="ml-1 mt-1 h-6 w-6 rounded-full bg-secondary-color text-font-color"
                //     >
                //       -
                //     </button>
                //     <span className="mx-2 text-font-color">{count}</span>{' '}
                //     <button
                //       type="button"
                //       onClick={() => setCount(count + 1)}
                //       className=" mt-1 h-6 w-6 rounded-full bg-secondary-color text-font-color"
                //     >
                //       +
                //     </button>
                //     <span className="ml-2">${count * item.DevicePrice}</span>
                //   </div>
                //   <button
                //     type="button"
                //     onClick={() => setAdd(0)}
                //     className="absolute ml-[72%] mt-44 h-8 w-28 rounded-full bg-primary-color text-sm text-quaternary-color group-hover:bg-secondary-color group-hover:text-font-color"
                //   >
                //     X <span className="ml-2"> Clear</span>
                //   </button>
                // </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddtoCartGrid;
