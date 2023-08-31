import Image from 'next/image';
import React, { useState } from 'react';

const CopyButton = ({ text }: { text: string }) => {
  const [showParagraph, setShowParagraph] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setShowParagraph(!showParagraph);
  };

  return (
    <div className="flex">
      <button type="button" onClick={handleCopy} className="ml-3 mt-1">
        <Image
          width={0}
          height={0}
          className="h-auto w-auto"
          src="/assets/icons/CopyLink.svg"
          alt=""
        />
      </button>
      {showParagraph && (
        <p className="ml-4 text-quaternary-color">Link Copied</p>
      )}
    </div>
  );
};

export default CopyButton;
