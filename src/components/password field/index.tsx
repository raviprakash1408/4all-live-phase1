'use client';

// import React from 'react'

import Image from 'next/image';
import { useState } from 'react';

import type { PasswordType } from './types';

const PasswordField = (props: PasswordType) => {
  const [password, setPassword] = useState(props.value);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    setIsPasswordValid(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // const passwordPattern =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // if (!passwordPattern.test(password)) {
    //   setIsPasswordValid(false);
    // } else {
    //   // Perform form submission or further processing
    // }
  };
  return (
    <div className="relative">
      <div className=" flex h-11 flex-col">
        <span
          className={`${
            isPasswordValid ? ' text-quaternary-color' : 'text-red-500'
          } pointer-events-none absolute bottom-8 ml-4 flex-1  bg-primary-color p-1 text-sm `}
        >
          {props.name}
        </span>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          onBlur={handleSubmit}
          // type="text"
          className={`flex-1 rounded-full border-2 border-solid ${
            isPasswordValid ? 'border-tertiary-color' : 'border-red-500'
          }  bg-primary-color pl-12 pr-[7.5rem] font-thin text-font-color transition-colors  duration-300 ease-in-out placeholder:text-quaternary-color ${
            isPasswordValid
              ? 'hover:border-quaternary-color'
              : 'hover:border-red-500'
          } hover:border-quaternary-color focus:outline-none`}
          // placeholder={props.placeholder}
        />
        <Image
          width={24}
          height={20}
          src={props.img}
          className="absolute ml-4 mt-[12px]"
          alt=""
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={`absolute ${
            props.type === 'all' ? 'ml-[14.5rem]' : 'right-3'
          }`}
        >
          <Image
            width={24}
            height={16}
            src="/assets/icons/PasswordEye.svg"
            alt=""
            className="  mt-[14px] cursor-pointer"
          />
        </button>

        {props.type === 'all' && (
          <>
            <div className="absolute ml-[16.6rem] mt-[3.5px]  h-9 w-10 cursor-pointer rounded-l-full bg-tertiary-color">
              <Image
                width={24}
                height={20}
                src="/assets/icons/Refresh.svg"
                alt=""
                className="ml-[10px] mt-[9px] h-5 w-6 "
              />
            </div>
            <div className="absolute left-1 ml-[19rem] mt-[3.5px] h-9 w-10 cursor-pointer rounded-r-full bg-tertiary-color">
              <Image
                width={24}
                height={20}
                src="/assets/icons/CopyIcon.svg"
                alt=""
                className="ml-[6px] mt-[9px] h-5 w-6 "
              />
            </div>
          </>
        )}

        <div className="absolute ml-2 mt-11">
          {!isPasswordValid && (
            <div className="mb-4 flex flex-col">
              <span className=" text-sm text-red-500">
                Password must be at least 8 characters long and contain at least
              </span>
              <span className=" text-sm text-red-500">
                {' '}
                one lowercase letter, one uppercase letter, one number, and one
                special character.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordField;
