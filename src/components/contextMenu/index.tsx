/* eslint-disable tailwindcss/no-custom-classname */
import React, { useEffect, useRef } from 'react';

interface FolderData {
  [key: string]: FileData | FolderData;
}

interface FileData {
  name: string;
  path: string;
}

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onOptionClick?: (
    option: string,
    folderName: string,
    folderData1: FolderData
  ) => void;
  onFileOptionClick?: (option: string, fileData: FileData) => void;

  folderName?: string;
  folderData1?: FolderData;
  type: string;
  fileData?: FileData;
}

const getShortcuts = () => {
  const os = window.navigator.platform;
  if (os.startsWith('Mac')) {
    return [
      { id: 1, option: 'Open', shortcut: '⌘+]' },
      { id: 2, option: 'Delete', shortcut: '⌘+Del' },
      { id: 3, option: 'Option 3', shortcut: '⌘+3' },
    ];
  }
  if (os.startsWith('Win')) {
    return [
      { id: 1, option: 'Open', shortcut: 'Ctrl+]' },
      { id: 2, option: 'Delete', shortcut: 'Ctrl+Del' },
      { id: 3, option: 'Option 3', shortcut: 'Ctrl+3' },
    ];
  }
  // Assuming Linux or other OS
  return [
    { id: 1, option: 'Open', shortcut: 'Ctrl+]' },
    { id: 2, option: 'Delete', shortcut: 'Ctrl+Del' },
    { id: 3, option: 'Option 3', shortcut: 'Ctrl+3' },
  ];
};

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onClose,
  onFileOptionClick,
  onOptionClick,
  folderName,
  folderData1,
  type,
  fileData,
}) => {
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (optionValue: string) => {
    if (onOptionClick && folderName && folderData1) {
      onOptionClick(optionValue, folderName, folderData1);
    }
    onClose(); // Close context menu after clicking an option
  };

  const handleFileOptionClick = (optionValue: string) => {
    if (onFileOptionClick && fileData) {
      onFileOptionClick(optionValue, fileData);
    }
    onClose(); // Close context menu after clicking an option
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  const shortcuts = getShortcuts();

  return (
    <div
      className="context-menu z-10"
      style={{
        position: 'absolute',
        top: y,
        left: x,
      }}
      ref={contextMenuRef}
    >
      {type === 'folder' && (
        <div className="flex w-48 flex-col items-center justify-center rounded-lg bg-tertiary-color py-[6px] text-quaternary-color">
          {shortcuts.map((item) => (
            <div className="" key={item.id}>
              <button
                onClick={() => handleOptionClick(item.option)}
                key={item.id}
                type="button"
                className="flex w-44 cursor-pointer flex-row whitespace-nowrap  rounded-lg pb-[2px]  pl-1 pt-1 text-center text-base duration-300 ease-in-out hover:bg-primary-color"
              >
                <div className="w-12">{item.option}</div>

                <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-14 w-16 text-sm group-data-[highlighted]:text-white">
                  {item.shortcut}
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
      {type === 'file' && (
        <div className="flex w-48 flex-col items-center justify-center rounded-lg bg-tertiary-color py-[6px] text-quaternary-color">
          {shortcuts.map((item) => (
            <div className="" key={item.id}>
              <button
                type="button"
                onClick={() => handleFileOptionClick(item.option)}
                className="flex w-44 cursor-pointer flex-row whitespace-nowrap rounded-lg pb-[2px] pl-1 pt-1 text-center text-base duration-300 ease-in-out hover:bg-primary-color"
              >
                <div className="w-12">{item.option}</div>
                <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-14 w-16 text-sm group-data-[highlighted]:text-white">
                  {item.shortcut}
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
