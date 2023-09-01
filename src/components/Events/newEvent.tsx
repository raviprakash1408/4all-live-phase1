'use client'
import React from 'react';
import { useRouter} from 'next/navigation';
import Image from 'next/image';

const NewEvent = () => {
  const router = useRouter();
  const handleNewEventClick = () => {
 
    router.push('/dashboard/events');
  };
 
  return (
    <div>
      <div className="flex">
        <button type='button' onClick={handleNewEventClick} className="ml-[15px] h-12 w-12 rounded-2xl bg-tertiary-color" >
          <Image src={"/assets/icons/arrow-close.svg"} height={8} width={8} alt='' className='ml-[17px]'/>
        </button>
        <div className="ml-4 mt-2 text-xl font-semibold text-stone-300">
          2024 Grammy’s
        </div>
      </div>
      <div className='flex bg-tertiary-color rounded-3xl h-[97vh] m-6 '>
<div className='w-[50%]'>

</div>
<div className='w-[50%]'></div>

      </div>
    </div>
  );
};

export default NewEvent;
