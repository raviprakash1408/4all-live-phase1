/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React from 'react';

const Billing = () => {
  return (
    <div className="w-[90%] rounded-3xl rounded-tl-none bg-tertiary-color px-6 py-3">
      <h3 className="text-[20px] text-font-color">Billing</h3>
      <p className="mt-0 text-[16px] text-font-color">
        Autem explicabo fuga eligendi veniam reprehenderit inventore. Quia
        voluptatem consectetur et commodi. Qui esse pariatur.
      </p>
      <div className="mt-[1rem] flex h-[370px] w-[100%] items-center justify-between rounded-[20px] bg-sixth-color p-2">
        <div className="flex w-[50%] flex-col items-center gap-4">
          <h3 className="text-[20px] font-semibold text-font-color">
            Your plan
          </h3>
          <Image
            src="/assets/icons/plan.svg"
            alt="plan"
            width={98}
            height={98}
          />
          <h1 className="text-[30px] font-semibold text-font-color">
            Organisation
          </h1>
          <p className="text-[16px] text-font-color">
            Monthly renewal Nov, 07 2024
          </p>
          <p className="text-[16px] text-font-color">
            Yearly renewal Sep, 07 2023
          </p>
          <button
            type="button"
            className="flex h-[50px] w-[217px] items-center gap-6 rounded-[20px] bg-tertiary-color p-3 text-[16px] text-font-color"
          >
            <Image
              src="/assets/icons/upgrade.svg"
              alt="upgrade"
              width={25}
              height={25}
            />
            Upgrade plan
          </button>
        </div>
        <div className="flex w-[50%] items-center justify-evenly p-5">
          <div className="flex h-[214px] w-[175px] flex-col items-center gap-1 rounded-[20px] bg-seventh-color p-4">
            <Image
              src="/assets/icons/Group 48096060.svg"
              alt="editing"
              width={40}
              height={40}
            />
            <p className="text-[16px] text-font-color">Editing seats</p>
            <h3 className="text-[20px] font-semibold text-font-color">11</h3>
            <button
              className="h-[25px] w-[75px] rounded-[20px] bg-sixth-color text-[14px] text-font-color"
              type="button"
            >
              1 yearly
            </button>
            <button
              className="h-[25px] w-[82px] rounded-[20px] bg-sixth-color text-[14px] text-font-color"
              type="button"
            >
              10 monthly
            </button>
          </div>
          <div className="flex h-[214px] w-[175px] flex-col items-center gap-1 rounded-[20px] bg-seventh-color p-4">
            <Image
              src="/assets/icons/active-invoices.svg"
              alt="invoice"
              width={40}
              height={40}
            />
            <p className="text-[16px] text-font-color">Tax invoice</p>
            <h3 className="text-[20px] font-semibold text-font-color">$150</h3>
          </div>
          <div className="flex h-[214px] w-[175px] flex-col items-center  gap-1 rounded-[20px] bg-seventh-color py-4">
            <Image
              src="/assets/icons/g3790.svg"
              alt="editing"
              width={40}
              height={40}
            />
            <p className="text-[16px] text-font-color">Editing seats today</p>
            <h3 className="text-[20px] font-semibold text-font-color">10</h3>
          </div>
        </div>
      </div>
      <div className="mt-3 flex w-[100%] justify-between gap-4">
        <div className="h-[375px] w-[50%] rounded-[20px] bg-sixth-color px-5 py-3">
          <h3 className="mx-3 mb-[0.8rem] text-[20px] text-font-color">
            Billing address
          </h3>
          <div className="my-2 flex h-[70px] w-[100%] items-center justify-between rounded-[20px] bg-tertiary-color p-4">
            <div className="flex w-[50%] items-center">
              <Image
                src="/assets/icons/address.svg"
                alt="address"
                width={25}
                height={21}
              />
              <div>
                <h3 className="ml-8 text-[16px] font-semibold text-font-color">
                  Miami,Fl
                </h3>
                <h3 className="ml-8 text-[16px] text-font-color">
                  43264 Glenda Mission
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-8 ">
              <div className="mr-6">
                <h3 className="text-[16px] text-font-color">Johan Romero</h3>
                <h3 className="text-[16px] text-font-color">WebMo Inc</h3>
              </div>
              <Image
                src="/assets/icons/path69.svg"
                alt="star"
                width={25}
                height={23.94}
              />
            </div>
          </div>
          <div className="my-2 flex h-[70px] w-[100%] items-center justify-between rounded-[20px] bg-tertiary-color p-4">
            <div className="flex w-[50%] items-center">
              <Image
                src="/assets/icons/g2638.svg"
                alt="address"
                width={25}
                height={21}
              />
              <div>
                <h3 className="ml-8 text-[16px] font-semibold text-font-color">
                  Bogisichton
                </h3>
                <h3 className="ml-8 text-[16px] text-font-color">
                  39503 Joshua Loaf
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-8 ">
              <div>
                <h3 className="mr-8 text-[16px] text-font-color">
                  The4AllCompany Inc
                </h3>
              </div>
            </div>
          </div>
          <div className="my-2 flex h-[70px] w-[100%] items-center justify-between rounded-[20px] bg-tertiary-color p-4">
            <div className="flex w-[50%] items-center">
              <Image
                src="/assets/icons/plus.svg"
                alt="address"
                width={25}
                height={21}
              />
              <h3 className="ml-8 text-[16px] font-semibold text-font-color">
                New billing address
              </h3>
            </div>
          </div>
        </div>
        <div className="h-[375px] w-[50%] rounded-[20px] bg-sixth-color px-5 py-3">
          <h3 className="mx-3 mb-[0.8rem] text-[20px] text-font-color">
            Payment methods
          </h3>
          <div className="my-2 flex h-[70px] w-[100%] items-center rounded-[20px] bg-tertiary-color p-4">
            <div className="flex w-[50%] items-center">
              <Image
                src="/assets/icons/mastercard.svg"
                alt="mastercard"
                width={40}
                height={25}
              />
              <div>
                <h3 className="ml-8 text-[16px] font-semibold text-[#7D7D7D]">
                  Mastercard
                </h3>
                <h3 className="ml-8 text-[16px] text-[#7D7D7D]">
                  •••• •••• •••• 4280
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-8 ">
              <div className="mr-6">
                <h3 className="text-[16px] font-semibold text-[#7D7D7D]">
                  Ronnie White
                </h3>
                <h3 className="text-[14px] text-[#7D7D7D]">Valid 04 / 2027</h3>
              </div>
            </div>
          </div>
          <div className="my-2 flex h-[70px] w-[100%] items-center rounded-[20px] bg-tertiary-color p-4">
            <div className="flex w-[50%] items-center">
              <Image
                src="/assets/icons/visa.svg"
                alt="visa"
                width={47}
                height={15}
              />
              <div>
                <h3 className="ml-8 text-[16px] font-semibold text-[#7D7D7D]">
                  Visa
                </h3>
                <h3 className="ml-8 text-[16px] text-[#7D7D7D]">
                  •••• •••• •••• 6546
                </h3>
              </div>
            </div>
            <div className="flex w-[100%] items-center justify-between gap-8 px-5 ">
              <div className="ml-[103px]">
                <h3 className="text-[16px] font-semibold text-[#7D7D7D]">
                  Paulette Schinner
                </h3>
                <h3 className="text-[14px] text-[#7D7D7D]">Valid 04 / 2027</h3>
              </div>
              <Image
                src="/assets/icons/path69.svg"
                alt="star"
                width={25}
                height={23.94}
              />
            </div>
          </div>
          <div className="my-2 flex h-[70px] w-[100%] items-center rounded-[20px] bg-tertiary-color p-4">
            <div className="flex w-[50%] items-center">
              <Image
                src="/assets/icons/g1855.svg"
                alt="Bank of america"
                width={25}
                height={25}
              />
              <div>
                <h3 className="ml-8 text-[16px] font-semibold text-[#7D7D7D]">
                  Bank of America
                </h3>
                <h3 className="ml-8 text-[16px] text-[#7D7D7D]">
                  •••• ••• ••454
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-8 ">
              <div className="mr-6">
                <h3 className="text-[16px] font-semibold text-[#7D7D7D]">
                  Bessie O'Kon
                </h3>
                <h3 className="text-[14px] text-[#7D7D7D]">Saving account</h3>
              </div>
            </div>
          </div>
          <div className="my-2 flex h-[70px] w-[100%] items-center justify-between rounded-[20px] bg-tertiary-color p-4">
            <div className="flex w-[50%] items-center">
              <Image
                src="/assets/icons/plus.svg"
                alt="address"
                width={25}
                height={21}
              />
              <h3 className="ml-8 text-[16px] font-semibold text-font-color">
                Add new payment method
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
