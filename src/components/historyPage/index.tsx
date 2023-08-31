'use client';

import Image from 'next/image';
import React from 'react';

const HistoryPage = () => {
  const data = [
    {
      id: 1,
      date: '12/07/2023',
      img: '/assets/MoLink/Tasks.svg',
      time: '10:54PM',
      heading: 'Cupiditate iste soluta',
      msg: 'Animi aperiam qui quam voluptatem accusamus sit in mollitia tempore. Reiciendis sint ut. Laboriosam autem',
    },
    {
      id: 2,
      date: '13/07/2023',
      img: '/assets/MoLink/Tasks.svg',
      time: '10:54PM',
      heading: 'Cupiditate iste soluta',
      msg: 'Animi aperiam qui quam voluptatem accusamus sit in mollitia tempore. Reiciendis sint ut. Laboriosam autem',
    },
    {
      id: 3,
      date: '13/07/2023',
      img: '/assets/MoLink/Tasks.svg',
      time: '10:54PM',
      heading: 'Cupiditate iste soluta',
      msg: 'Animi aperiam qui quam voluptatem accusamus sit in mollitia tempore. Reiciendis sint ut. Laboriosam autem',
    },
    {
      id: 4,
      date: '14/07/2023',
      img: '/assets/MoLink/Tasks.svg',
      time: '10:54PM',
      heading: 'Cupiditate iste soluta',
      msg: 'Animi aperiam qui quam voluptatem accusamus sit in mollitia tempore. Reiciendis sint ut. Laboriosam autem',
    },
    {
      id: 5,
      date: '11/07/2023',
      img: '/assets/MoLink/Tasks.svg',
      time: '10:54PM',
      heading: 'Cupiditate iste soluta',
      msg: 'Animi aperiam qui quam voluptatem accusamus sit in mollitia tempore. Reiciendis sint ut. Laboriosam autem',
    },
    {
      id: 6,
      date: '11/07/2023',
      img: '/assets/MoLink/Tasks.svg',
      time: '10:54PM',
      heading: 'Cupiditate iste soluta',
      msg: 'Animi aperiam qui quam voluptatem accusamus sit in mollitia tempore. Reiciendis sint ut. Laboriosam autem',
    },
    {
      id: 7,
      date: '11/07/2023',
      img: '/assets/MoLink/Tasks.svg',
      time: '10:54PM',
      heading: 'Cupiditate iste soluta',
      msg: 'Animi aperiam qui quam voluptatem accusamus sit in mollitia tempore. Reiciendis sint ut. Laboriosam autem',
    },
    {
      id: 8,
      date: '11/07/2023',
      img: '/assets/MoLink/Tasks.svg',
      time: '10:54PM',
      heading: 'Cupiditate iste soluta',
      msg: 'Animi aperiam qui quam voluptatem accusamus sit in mollitia tempore. Reiciendis sint ut. Laboriosam autem',
    },
    {
      id: 9,
      date: '11/07/2023',
      img: '/assets/MoLink/Tasks.svg',
      time: '10:54PM',
      heading: 'Cupiditate iste soluta',
      msg: 'Animi aperiam qui quam voluptatem accusamus sit in mollitia tempore. Reiciendis sint ut. Laboriosam autem',
    },
    {
      id: 10,
      date: '11/07/2023',
      img: '/assets/MoLink/Tasks.svg',
      time: '10:54PM',
      heading: 'Cupiditate iste soluta',
      msg: 'Animi aperiam qui quam voluptatem accusamus sit in mollitia tempore. Reiciendis sint ut. Laboriosam autem',
    },
    {
      id: 11,
      date: '11/07/2023',
      img: '/assets/MoLink/Tasks.svg',
      time: '10:54PM',
      heading: 'Cupiditate iste soluta',
      msg: 'Animi aperiam qui quam voluptatem accusamus sit in mollitia tempore. Reiciendis sint ut. Laboriosam autem',
    },
  ];

  let currentDate: string | null = null;
  // const url = 'http://localhost:9000/api/v1/live_recording_settings/1';

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(url);
  //     const datas1 = await response.json();
  //     console.log('jkbdncjkn', datas1); // Log the fetched data to the console
  //   } catch (error) {
  //     console.log('Error fetching data:', error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div className="relative">
      <div className="custom-scrollbar  mt-4 h-[81vh] w-[100%] select-none overflow-y-auto overflow-x-hidden">
        {data.map((item) => {
          const shouldDisplayDate = item.date !== currentDate;
          currentDate = item.date;

          return (
            <div className="mb-4" key={item.id}>
              {shouldDisplayDate && (
                <span className="ml-32 text-xl font-semibold text-secondary-color sm:text-base lg:text-xl">
                  {item.date}
                </span>
              )}
              <div className="flex">
                <div className="ml-4 mt-1.5 flex h-16 w-16 items-center justify-center rounded-full bg-tertiary-color">
                  <Image
                    src={item.img}
                    width={30}
                    height={30}
                    alt=""
                    className="h-auto w-auto"
                  />
                </div>
                <div className="z-10 ml-4 mt-6 h-7 w-3 bg-primary-color">
                  <Image
                    width={10}
                    height={14}
                    src="/assets/icons/completedDot.svg"
                    alt=""
                    className="mt-2 "
                  />
                </div>

                <div className="ml-4 mt-2 flex min-h-min w-[78vw] rounded-[20px] bg-tertiary-color">
                  <div className="ml-4 mt-4 text-base text-quaternary-color sm:text-xs 2xl:text-base">
                    {item.time}
                  </div>
                  <div className="ml-8 mt-2 flex flex-col">
                    <span className="text-base font-semibold text-font-color sm:text-xs 2xl:text-base">
                      {item.heading}
                    </span>
                    <span className="mt-[-4px] text-base  font-semibold text-quaternary-color sm:text-xs 2xl:text-base">
                      {item.msg}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div>
          <hr className="absolute left-[99px] top-[34px] h-[77vh] rotate-180 border-2 border-tertiary-color" />
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
