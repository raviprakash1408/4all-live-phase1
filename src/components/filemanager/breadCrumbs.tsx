import Image from 'next/image';
import React from 'react';

interface BreadcrumbsProps {
  currentFolderPath: string;
  onFolderClick: (folderPath: string, folderName: string) => void;
  // onClick?: () => void; // Define the onClick property here
}

const Breadcrumbs = ({
  currentFolderPath,
  onFolderClick,
}: BreadcrumbsProps) => {
  const folders = currentFolderPath
    .split('/')
    .filter((folder) => folder !== '');
  const handleFolderClick = (index: number, FolderName: string) => {
    const clickedFolderPath = folders.slice(0, index + 1).join('/');
    onFolderClick(clickedFolderPath, FolderName);
  };

  return (
    <div className="ml-4 rounded-md bg-primary-color">
      {currentFolderPath !== '' ? (
        <ul className="flex h-10 w-min rounded-full bg-tertiary-color">
          <li>
            <div className="flex h-10 rounded-l-full bg-fifth-color pl-5 pr-4 text-center">
              <Image
                src="/assets/icons/folder-large.svg"
                width={25}
                height={36}
                alt=""
                className="mt-[2px] pr-2"
              />
              <div className="cursor-pointer pr-2 pt-2.5 text-sm text-quaternary-color">
                folders
              </div>
            </div>
          </li>
          {folders.map((folder, index) => (
            <li key={folder} className="mt-0">
              <div className="flex">
                {index > 0 && (
                  <Image
                    src="/assets/icons/Vector (3).png"
                    width={0}
                    height={0}
                    className="mt-4 h-2 w-2 -rotate-90"
                    alt=""
                  />
                )}
                <button
                  type="button"
                  className={`cursor-pointer whitespace-nowrap pl-5 pr-6 pt-2.5 text-center text-sm text-quaternary-color ${
                    index === folders.length - 1 ? 'font-medium' : ''
                  }`}
                  onClick={() => handleFolderClick(index, folder)}
                >
                  {folder}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Breadcrumbs;
