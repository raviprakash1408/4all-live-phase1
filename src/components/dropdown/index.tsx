import Image from 'next/image';
import React from 'react';

export default function DropdownComponent({
  backgroundColor,
  Color1,
}: {
  backgroundColor: string;
  Color1: string;
}) {
  return (
    <div>
      <div
        // type="button"
        className={` flex items-center rounded-full border-2  border-primary-color ${backgroundColor} p-4 hover:border-quaternary-color`}
      >
        <Image
          src="/assets/icons/Vector (3).png"
          alt="Icon"
          className={`${Color1}`}
        />
      </div>
    </div>
  );
}
