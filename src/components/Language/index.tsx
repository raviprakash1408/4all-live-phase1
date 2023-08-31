'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import type { LanguageTypes } from './types';

const LanguageSelect = (props: LanguageTypes) => {
  const [popup, setPopup] = useState(false);

  const [country, setCountry] = useState('en');
  const [countryFlag, setCountryFlag] = useState('/assets/country/English.svg');
  const [selectedOption, setSelectedOption] = useState(1);
  const popupRef = useRef<HTMLDivElement>(null); // Define the type of popupRef

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setPopup(false);
      }
    };

    const handleEscapeKey = (event: any) => {
      if (event.key === 'Escape') {
        setPopup(false);
      }
    };

    if (popup) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [popup]);
  const language1 = [
    {
      id: 1,
      img: '/assets/country/English.svg',
      Language: 'English',
      LanguageCode: 'en',
    },
    {
      id: 2,
      img: '/assets/country/china.svg',
      Language: 'Chinese',
      LanguageCode: 'zh',
    },
    {
      id: 3,
      img: '/assets/country/france.svg',
      Language: 'French',
      LanguageCode: 'fr',
    },
    {
      id: 4,
      img: '/assets/country/germany.svg',
      Language: 'German',
      LanguageCode: 'de',
    },
    {
      id: 5,
      img: '/assets/country/India.svg',
      Language: 'Hindi',
      LanguageCode: 'hi',
    },
    {
      id: 6,
      img: '/assets/country/italy.svg',
      Language: 'Italian',
      LanguageCode: 'it',
    },
    {
      id: 7,
      img: '/assets/country/japan.svg',
      Language: 'Japanese',
      LanguageCode: 'ja',
    },
    {
      id: 8,
      img: '/assets/country/portugal.svg',
      Language: 'Portuguese',
      LanguageCode: 'pt',
    },
    {
      id: 9,
      img: '/assets/country/spain.svg',
      Language: 'Spanish',
      LanguageCode: 'es',
    },
    {
      id: 10,
      img: '/assets/country/russia.svg',
      Language: 'Russian',
      LanguageCode: 'ru',
    },
    {
      id: 11,
      img: '/assets/country/thailand.svg',
      Language: 'Thai',
      LanguageCode: 'th',
    },
  ];

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setPopup(!popup);
        }}
        className="relative flex h-11 w-20 rounded-full bg-tertiary-color"
      >
        <Image
          width={0}
          height={0}
          src={countryFlag}
          alt=""
          className="ml-2 mt-2 h-auto w-auto"
        />
        <p className="ml-[11px] mt-2 font-semibold text-font-color">
          {country}
        </p>
      </button>
      {popup && (
        <div
          ref={popupRef}
          className={` absolute ${props.position}  w-48 rounded-2xl bg-tertiary-color`}
        >
          {language1.map((item) => (
            <div key={item.id}>
              <div className=" group w-36 rounded-full">
                <button
                  type="button"
                  onClick={() => {
                    setCountry(item.LanguageCode);
                    setCountryFlag(item.img);
                    setPopup(false);
                    setSelectedOption(item.id);
                  }}
                  onBlur={() => {
                    setPopup(false);
                  }}
                  className={`${
                    selectedOption === item.id ? 'bg-secondary-color ' : ''
                  } ml-5 mt-3 flex h-12 w-40 rounded-full  pb-1 group-hover:bg-secondary-color `}
                >
                  <Image
                    width={0}
                    height={0}
                    src={item.img}
                    alt=""
                    className="ml-2 mt-2 h-8 w-auto"
                  />
                  <p
                    className={`ml-4 mt-3 cursor-pointer select-none ${
                      selectedOption === item.id
                        ? 'text-font-color'
                        : 'text-quaternary-color'
                    } group-hover:text-font-color`}
                  >
                    {item.Language}
                  </p>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
