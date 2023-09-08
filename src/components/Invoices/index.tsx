import Image from 'next/image';
import React from 'react';

const Invoices = () => {
  return (
    <div className="w-[90%] rounded-3xl rounded-tl-none bg-tertiary-color px-6 py-3">
      <div className="mb-4 flex h-[50px] w-[318px] items-center gap-4 rounded-[20px] bg-primary-color p-4">
        <Image
          src="/assets/icons/dollar.svg"
          alt="currency"
          width={25}
          height={25}
        />
        <p className="text-[16px] text-font-color">
          Pay selected invoices $ 59,98
        </p>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-primary-color p-4">
        <div className="flex min-w-[14%] items-center gap-3">
          <Image
            src="/assets/icons/Group 48095782.svg"
            alt="checkbox"
            width={20}
            height={20}
          />
          <p className="text-[16px] font-semibold text-font-color">Invoice</p>
        </div>
        <div className="min-w-[15%] max-w-[15%]">
          <p className="text-[16px] font-semibold text-font-color">
            Billing / overdue date
          </p>
        </div>
        <div className="flex min-w-[8%] items-center">
          <p className="text-[16px] font-semibold text-font-color">Amount</p>
        </div>
        <div className="flex min-w-[10%] items-center">
          <p className="text-[16px] font-semibold text-font-color">Plan</p>
        </div>
        <div className="flex min-w-[8%] items-center">
          <p className="text-[16px] font-semibold text-font-color">Status</p>
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-4">
        <div className=" flex min-w-[12%] items-center gap-3">
          <Image
            src="/assets/icons/Rectangle 39422.svg"
            alt="checkbox"
            width={20}
            height={20}
          />
          <p className="text-[16px] font-semibold text-font-color">
            INVT000021-10
          </p>
        </div>
        <div className="ml-7 flex min-w-[15%] max-w-[18%] flex-col">
          <p className="text-[16px] font-semibold text-font-color">
            Sun Dec 5 2023
          </p>
          <p className="text-[16px] font-semibold text-font-color">
            Sun Dec 14 2023
          </p>
        </div>
        <div className="flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] font-semibold text-font-color">$29,99</p>
        </div>
        <div className=" flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] font-semibold text-font-color">Anual Pro</p>
        </div>
        <div className="ml-7 min-w-[8%] max-w-[10%]">
          <button
            type="button"
            className="h-[50px] w-[132px] rounded-[20px] bg-seventh-color p-3 text-[16px] text-font-color"
          >
            Success
          </button>
        </div>
        <div className="ml-[25%]">
          <button
            type="button"
            className="flex h-[50px]  w-[160px] items-center gap-3 p-3 text-[16px]  text-font-color"
          >
            <Image
              src="/assets/icons/g285.svg"
              alt="download"
              width={25}
              height={25}
            />
            <p>Download</p>
          </button>
        </div>
        <div className="flex min-w-[2%] max-w-[5%] items-center">
          <button type="button">
            <Image
              src="/assets/icons/Group 48095882.svg"
              alt="..."
              width={70}
              height={50}
            />
          </button>
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-4">
        <div className=" flex min-w-[12%] items-center gap-3">
          <Image
            src="/assets/icons/checked.svg"
            alt="checkbox"
            width={20}
            height={20}
          />
          <p className="text-[16px] font-semibold text-font-color">
            INVT000021-10
          </p>
        </div>
        <div className="ml-7 flex min-w-[15%] max-w-[18%] flex-col">
          <p className="text-[16px] font-semibold text-font-color">
            Sun Dec 5 2023
          </p>
          <p className="text-[16px] font-semibold text-font-color">
            Sun Dec 14 2023
          </p>
        </div>
        <div className="flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] font-semibold text-font-color">$29,99</p>
        </div>
        <div className=" flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] font-semibold text-font-color">Anual Pro</p>
        </div>
        <div className="ml-7 min-w-[8%] max-w-[10%]">
          <button
            type="button"
            className="h-[50px] w-[132px] rounded-[20px] bg-[#FF4615] p-3 text-[16px] text-font-color"
          >
            Overdue
          </button>
        </div>
        <div className="ml-[25%]">
          <button
            type="button"
            className="flex h-[50px]  w-[160px] items-center gap-3 rounded-[20px] bg-seventh-color p-3 text-[16px] text-font-color"
          >
            <Image
              src="/assets/icons/dollar-grey.svg"
              alt="dollar"
              width={25}
              height={25}
            />
            <p>Pay invoice</p>
          </button>
        </div>
        <div className="flex min-w-[2%] max-w-[5%] items-center">
          <button type="button">
            <Image
              src="/assets/icons/Group 48095882.svg"
              alt="..."
              width={70}
              height={50}
            />
          </button>
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-4">
        <div className=" flex min-w-[12%] items-center gap-3">
          <Image
            src="/assets/icons/checked.svg"
            alt="checkbox"
            width={20}
            height={20}
          />
          <p className="text-[16px] font-semibold text-font-color">
            INVT000021-10
          </p>
        </div>
        <div className="ml-7 flex min-w-[15%] max-w-[18%] flex-col">
          <p className="text-[16px] font-semibold text-font-color">
            Sun Dec 5 2023
          </p>
          <p className="text-[16px] font-semibold text-font-color">
            Sun Dec 14 2023
          </p>
        </div>
        <div className="flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] font-semibold text-font-color">$29,99</p>
        </div>
        <div className=" flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] font-semibold text-font-color">Anual Pro</p>
        </div>
        <div className="ml-7 min-w-[8%] max-w-[10%]">
          <button
            type="button"
            className="h-[50px] w-[132px] rounded-[20px] bg-[#FF4615] p-3 text-[16px] text-font-color"
          >
            Overdue
          </button>
        </div>
        <div className="ml-[25%]">
          <button
            type="button"
            className="flex h-[50px]  w-[160px] items-center gap-3 rounded-[20px] bg-seventh-color p-3 text-[16px] text-font-color"
          >
            <Image
              src="/assets/icons/dollar-grey.svg"
              alt="dollar"
              width={25}
              height={25}
            />
            <p>Pay invoice</p>
          </button>
        </div>
        <div className="flex min-w-[2%] max-w-[5%] items-center">
          <button type="button">
            <Image
              src="/assets/icons/Group 48095882.svg"
              alt="..."
              width={70}
              height={50}
            />
          </button>
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-4">
        <div className=" flex min-w-[12%] items-center gap-3">
          <Image
            src="/assets/icons/Rectangle 39422.svg"
            alt="checkbox"
            width={20}
            height={20}
          />
          <p className="text-[16px] font-semibold text-font-color">
            INVT000021-10
          </p>
        </div>
        <div className="ml-7 flex min-w-[15%] max-w-[18%] flex-col">
          <p className="text-[16px] font-semibold text-font-color">
            Sun Dec 5 2023
          </p>
          <p className="text-[16px] font-semibold text-font-color">
            Sun Dec 14 2023
          </p>
        </div>
        <div className="flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] font-semibold text-font-color">$29,99</p>
        </div>
        <div className=" flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] font-semibold text-font-color">Anual Pro</p>
        </div>
        <div className="ml-7 min-w-[8%] max-w-[10%]">
          <button
            type="button"
            className="h-[50px] w-[132px] rounded-[20px] bg-seventh-color p-3 text-[16px] text-font-color"
          >
            Billed
          </button>
        </div>
        <div className="ml-[25%]">
          <button
            type="button"
            className="flex h-[50px]  w-[160px] items-center gap-3 p-3 text-[16px]  text-font-color"
          >
            <Image
              src="/assets/icons/g285.svg"
              alt="download"
              width={25}
              height={25}
            />
            <p>Download</p>
          </button>
        </div>
        <div className="flex min-w-[2%] max-w-[5%] items-center">
          <button type="button">
            <Image
              src="/assets/icons/Group 48095882.svg"
              alt="..."
              width={70}
              height={50}
            />
          </button>
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-4">
        <div className=" flex min-w-[12%] items-center gap-3">
          <Image
            src="/assets/icons/Rectangle 39422.svg"
            alt="checkbox"
            width={20}
            height={20}
          />
          <p className="text-[16px] font-semibold text-font-color">
            INVT000021-10
          </p>
        </div>
        <div className="ml-7 flex min-w-[15%] max-w-[18%] flex-col">
          <p className="text-[16px] font-semibold text-font-color">
            Sun Dec 5 2023
          </p>
          <p className="text-[16px] font-semibold text-font-color">
            Sun Dec 14 2023
          </p>
        </div>
        <div className="flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] font-semibold text-font-color">$29,99</p>
        </div>
        <div className=" flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] font-semibold text-font-color">Anual Pro</p>
        </div>
        <div className="ml-7 min-w-[8%] max-w-[10%]">
          <button
            type="button"
            className="h-[50px] w-[132px] rounded-[20px] bg-seventh-color p-3 text-[16px] text-font-color"
          >
            Success
          </button>
        </div>
        <div className="ml-[25%]">
          <button
            type="button"
            className="flex h-[50px]  w-[160px] items-center gap-3 p-3 text-[16px]  text-font-color"
          >
            <Image
              src="/assets/icons/g285.svg"
              alt="download"
              width={25}
              height={25}
            />
            <p>Download</p>
          </button>
        </div>
        <div className="flex min-w-[2%] max-w-[5%] items-center">
          <button type="button">
            <Image
              src="/assets/icons/Group 48095882.svg"
              alt="..."
              width={70}
              height={50}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
