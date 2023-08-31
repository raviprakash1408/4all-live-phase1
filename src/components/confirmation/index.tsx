import React from 'react';

type ConfirmationPopupProps = {
  title: string;
  onConfirmation?: (confirmed: boolean) => Promise<void> | void;
};
const ConfirmationPopup = ({
  title,
  onConfirmation,
}: ConfirmationPopupProps) => {
  const handleConfirmation = (confirmed: boolean) => {
    if (onConfirmation) {
      onConfirmation(confirmed);
    }
  };
  return (
    <div>
      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-fifthOpacity-color ">
        <div className="rounded-md bg-tertiary-color p-6">
          <p className="text-quaternary-color">{title}</p>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => handleConfirmation(true)}
              className="mr-2 rounded-md bg-red-500 px-4 py-2 text-white"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleConfirmation(false)}
              className="rounded-md bg-gray-300 px-4 py-2 text-gray-800"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
