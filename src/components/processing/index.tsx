import Image from 'next/image';
import React, { useState } from 'react';

import { HalfCurvedButtons } from '../halfcurvedbuttons';
import CommonContent from './commonContent';

const ProcessingGrid = () => {
  const [type, setType] = useState('status');
  return (
    <div>
      {type === 'status' && (
        <div
          className={`flex  h-80  w-[21.5rem] rounded-2xl border-2 border-quaternary-color bg-primary-color p-4 `}
        >
          <div>
            <div className="ml-[3px] flex h-14 flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  setType('calculating');
                }}
                className="text-lg "
              >
                <HalfCurvedButtons
                  content="Start speed test"
                  height="h-8"
                  width="w-[226px] pl-8"
                  backgroundColor="bg-tertiary-color"
                  image="/assets/MoLink/Status.svg"
                  textcolor="text-quaternary-color"
                />
              </button>

              {/* <h1 className="mt-2 text-lg text-secondary-color">Processing</h1> */}
              <p className=" mt-2 text-center text-quaternary-color">
                Please run your first speed test
              </p>
              <hr className=" mt-2 w-full border border-tertiary-color" />

              <CommonContent />
            </div>
          </div>
        </div>
      )}
      {type === 'calculating' && (
        <div
          className={`flex  h-[25rem]  w-[21.5rem] rounded-2xl border-2 border-quaternary-color bg-tertiary-color p-4 `}
        >
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => {
                setType('finished');
              }}
              className=""
            >
              <HalfCurvedButtons
                content="Calculating speed test"
                height="h-10"
                width="w-60"
                backgroundColor="bg-primary-color"
                image="/assets/MoLink/Status.svg"
                textcolor="text-quaternary-color"
              />
            </button>
            <div className="mt-2 animate-spin">
              <Image
                width={0}
                height={0}
                className="h-auto w-auto"
                src="/assets/icons/icon7.svg"
                alt="no icon"
              />
            </div>
            <h1 className="mt-2 text-lg text-secondary-color">Processing</h1>
            <p className=" text-center text-quaternary-color">
              Hold on,we are calculating your connectivity result.
            </p>
            <CommonContent />
          </div>
        </div>
      )}
      {type === 'finished' && (
        <div
          className={`flex  h-[28rem]  w-[21.5rem] rounded-2xl border-2 border-quaternary-color bg-primary-color p-4 `}
        >
          <div>
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  setType('status');
                }}
                className="text-lg"
              >
                <HalfCurvedButtons
                  content="Start speed test"
                  height="h-10"
                  width="w-56"
                  backgroundColor="bg-tertiary-color"
                  image="/assets/MoLink/Status.svg"
                  textcolor="text-quaternary-color"
                />
              </button>

              {/* <h1 className="mt-2 text-lg text-secondary-color">Processing</h1> */}
              <p className=" mt-2 text-center text-quaternary-color">
                Last tested 06/05/2023 2:28 PM
              </p>
              <div className="mb-1 mt-2 flex whitespace-nowrap">
                <Image
                  width={20}
                  height={20}
                  src="/assets/icons/Download.svg"
                  alt=""
                  className="mr-2"
                />
                <p className="-mt-1 mr-24  text-quaternary-color">
                  <span className="font-semibold"> Download: </span>
                  <span className="ml-1 text-sm">92.98Mbps</span>
                </p>
              </div>
              <div className="my-1 mr-[22px] flex whitespace-nowrap">
                <Image
                  width={20}
                  height={20}
                  src="/assets/icons/Download.svg"
                  alt=""
                  className="mr-2 rotate-180"
                />
                <p className="-mt-1 mr-24 text-quaternary-color">
                  <span className="font-semibold">Upload: </span>
                  <span className="ml-1 text-sm">93.54Mbps</span>
                </p>
              </div>
              <div className="my-1 mr-[40px] flex flex-row">
                <Image
                  width={20}
                  height={20}
                  src="/assets/icons/Latency.svg"
                  alt=""
                  className="mr-2"
                />
                <p className="-mt-1 mr-20 whitespace-nowrap text-quaternary-color">
                  <span className="font-semibold"> Latency: </span>
                  <span className="ml-1 text-sm">110.08 ms</span>
                </p>
              </div>
              <div className="my-1 mr-8 flex whitespace-nowrap">
                <Image
                  width={20}
                  height={20}
                  src="/assets/icons/PacketLoss.svg"
                  alt=""
                  className="mr-2"
                />
                <p className="-mt-1 mr-24 text-quaternary-color">
                  <span className="font-semibold"> Packet loss: </span>
                  <span className="ml-1 text-sm">0.0%</span>
                </p>
              </div>
              <hr className="mt-2 w-full border border-tertiary-color" />

              <CommonContent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProcessingGrid;
