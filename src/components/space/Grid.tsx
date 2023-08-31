'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Loading from '../Loading';
import { Data } from './Data';

const Grid = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Delay of 2 seconds (2000 milliseconds)
  }, []);

  return (
    <div>
      {isLoading ? (
        <>
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
        </>
      ) : (
        <section className=" grid grid-cols-4 gap-0 pr-16 text-gray-600  ">
          {/* From Here We Can copy this code for second grid */}

          {Data.map((item) => (
            <div
              key={item.id}
              className="container mx-auto  mt-4 duration-300 ease-in-out hover:mt-2"
            >
              <div className=" flex w-1/2 flex-col">
                <div className="mb-6 w-1/2 lg:mb-0 lg:w-96" />
              </div>
              <div className="m-2 flex flex-wrap">
                <div className="  md:w-full xl:w-full">
                  <div className=" rounded-2xl bg-tertiary-color p-6 duration-300 ease-in-out hover:bg-fifth-color">
                    <div className="flex justify-center">
                      <Image
                        width={96}
                        height={96}
                        className="mb-6 rounded-full object-cover object-center duration-300  ease-in-out hover:h-28 hover:w-28"
                        src={item.img}
                        alt="content"
                        draggable="false"
                      />
                    </div>
                    <h2 className="mb-4 flex-1 select-none text-center text-xl font-bold text-font-color">
                      {item.name}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Grid;
