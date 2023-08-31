'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

// import InputField from '../input field/InputField';
// import PasswordField from '../password field';
import Checkbox from '../checkbox/checkbox';

const Login = () => {
  // const [Email, setEmail] = useState("")
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  // const [IsEmailValid, setIsEmailValid] = useState(true)

  // const [error, setError] = useState('');

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    setIsPasswordValid(true);
  };

  // const handleChange = (event: any) => {
  //   setEmail(event.target.value);
  //   setIsEmailValid(false)
  //   // { error && <div>{error}</div> }
  //   if (!Email) {
  //     setError('Please enter an email address');
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
  //     setError('Please enter a valid email address');
  //   } else {
  //     setError('ssssssss');
  //     // Email is valid, do something with it
  //   }

  // }

  const togglePasswordVisibility = () => {
    setShowPassword(showPassword);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {
      setIsPasswordValid(false);
    } else {
      // Perform form submission or further processing
    }
  };

  return (
    <div className="mt-48">
      <Link href="/">
        <div className="mb-6 mr-80 flex items-center justify-center no-underline">
          <div className="w-10 bg-tertiary-color no-underline">
            <Image
              width={50}
              height={50}
              src="/assets/icons/LeftArrow.svg"
              alt=""
            />
          </div>
        </div>
      </Link>
      ;
      <div className="flex justify-center">
        <Image
          width={75}
          height={75}
          src="/assets/icons/mo.svg"
          className="pr-4 pt-4"
          alt=""
        />
        <Image
          width={175}
          height={30}
          src="/assets/icons/Meetmo1.svg"
          className="mt-3 pr-1"
          alt=""
        />
      </div>
      <form action="form" onSubmit={handleSubmit}>
        <div className="mt-[-20px] flex justify-center">
          <div>
            <div className="relative m-6 flex h-[2.8rem] flex-col">
              <span className="pointer-events-none absolute left-5 top-7 flex-1  bg-primary-color p-1 text-sm  text-quaternary-color">
                Email
              </span>
              <input
                type="text"
                name="Email"
                // value={Email}
                autoComplete="off"
                // onChange={handleChange}
                // onBlur={handleSubmit}
                className={`mt-[11.8%] h-12 w-96 flex-1 rounded-full border-2 border-solid border-tertiary-color bg-primary-color py-2 pl-12
           pr-2 text-sm font-thin text-font-color transition-colors duration-300  ease-in-out placeholder:text-quaternary-color hover:border-secondary-color
           focus:outline-none`}
              />
              <Image
                width={0}
                height={0}
                src="/assets/icons/Email.svg"
                className="absolute left-[14px] top-6 h-20 w-5"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="mb-0 mt-4 flex justify-center">
          <div className="relative">
            <div className=" m-6 flex h-11 flex-col">
              <span
                className={`${
                  isPasswordValid ? ' text-quaternary-color' : 'text-red-500'
                } pointer-events-none absolute bottom-8 ml-4 flex-1 bg-primary-color text-sm `}
              />
              {/* <span
                className={`${IsEmailValid ? ' text-quaternary-color' : 'text-red-500'
                  } pointer-events-none absolute bottom-8 ml-4 flex-1 bg-primary-color text-sm `}
              /> */}
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onBlur={handleSubmit}
                // type="text"
                className={`h-12 w-96 flex-1 rounded-full border-2 border-solid ${
                  isPasswordValid ? 'border-tertiary-color' : 'border-red-500'
                }  bg-primary-color pl-12 pr-[7.5rem] text-sm font-thin text-font-color transition-colors duration-300 ease-in-out placeholder:text-quaternary-color ${
                  isPasswordValid
                    ? 'hover:border-quaternary-color'
                    : 'hover:border-red-500'
                }  font-semibold hover:border-quaternary-color focus:outline-none`}
                placeholder="Password"
              />
              <Image
                width={0}
                height={0}
                src="/assets/icons/Password.svg"
                className={`absolute ml-4 mt-[12px] h-5 w-6 `}
                alt=""
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-9 top-9"
              >
                <Image
                  width={0}
                  height={0}
                  src="/assets/icons/PasswordEyeClose.svg"
                  alt=""
                  className=" h-4 w-6 cursor-pointer"
                />
              </button>

              <div className="absolute ml-2 mt-11">
                {!isPasswordValid && (
                  <div className=" flex flex-col">
                    <span className=" text-sm text-red-500">
                      Password is not valid
                    </span>
                    {/* <label className=" text-sm text-red-500">
                      {' '}
                      one lowercase letter, one uppercase letter, one number, and one
                      special character.
                    </label> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="mr-[5.6rem] flex">
            <div className="mt-[2px]">
              <Checkbox backgroundColor="" type="Square" id="" />
            </div>
            <div>
              <p className="pl-2 text-base text-font-color ">Remember me</p>
            </div>
          </div>
          <p className="cursor-pointer pl-14 text-sm text-secondary-color ">
            Forgot password?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className=" mt-4 flex h-12 w-44 cursor-pointer justify-center rounded-full bg-secondary-color p-1 text-font-color"
          >
            <span className="mt-1.5">Sign in</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
