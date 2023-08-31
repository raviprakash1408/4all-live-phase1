'use client';

import Image from 'next/image';

import useTheme from '@/store/themeStore';

const ThemeToggle = () => {
  const toggleDarkMode = useTheme((state) => state.toggleDarkMode);
  const isDarkMode = useTheme((state) => state.isDarkMode);

  return (
    <div>
      <div className="flex h-11 w-16 items-center justify-center rounded-full bg-tertiary-color">
        <label
          htmlFor="toggle"
          className="relative inline-flex cursor-pointer items-center"
        >
          <input
            onClick={toggleDarkMode}
            type="checkbox"
            value=""
            id="toggle"
            className="peer sr-only"
          />
          <div className="h-6 w-11 rounded-full border-2 border-solid border-[#70a6a6]  after:absolute after:left-[6px] after:top-[4px]  after:h-4 after:w-4 after:rounded-full after:border-2 after:border-[#70a6a6] after:bg-quaternary-color after:transition-all after:content-[''] peer-checked:border-2 peer-checked:border-quaternary-color  peer-checked:after:translate-x-full peer-checked:after:border-2 peer-checked:after:border-quaternary-color   peer-checked:after:bg-quaternary-color peer-focus:outline-none  dark:bg-tertiary-color dark:after:bg-[#70a6a6]" />

          <div>
            {!isDarkMode && (
              <div>
                <Image
                  width={0}
                  height={0}
                  src="/assets/icons/DarkTheme.svg"
                  alt=""
                  className="absolute bottom-[0.30rem] right-1 h-auto w-auto "
                />
              </div>
            )}
            {isDarkMode && (
              <div>
                <Image
                  width={0}
                  height={0}
                  src="/assets/icons/LightTheme.svg"
                  alt=""
                  className="absolute bottom-[0.30rem] left-[5px] h-auto w-auto "
                />
              </div>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default ThemeToggle;
