// button component

import React from 'react';

const AuthButton = () => {
  return (
    <button
      type="button"
      className="group flex h-11 w-full items-center gap-3 rounded-3xl border-2 border-solid border-tertiary-color bg-primary-color px-6 text-quaternary-color"
    >
      <div className="before:group-hover:animate-scanning relative h-[26px] w-[20px] bg-[url('/assets/icons/finger.svg')] before:absolute before:-inset-0 before:h-full before:w-full before:bg-[url('/assets/icons/authenticate.svg')] before:content-['']" />

      <div className="text-sm ">Authenticate</div>
    </button>
  );
};

export { AuthButton };
