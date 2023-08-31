import React from 'react';

interface NoPreviewProps {
  width: string;
  height: string;
  type: string;
}

const NoPreview: React.FC<NoPreviewProps> = ({ width, height, type }) => {
  return (
    <div>
      {type === 'NoPreview' && (
        <div
          className={`flex ${height} ${width} items-center justify-center rounded-xl border-2 border-tertiary-color bg-fifth-color `}
        >
          <div className="text-base font-medium text-quaternary-color">
            No Preview Available
          </div>
        </div>
      )}
      {type === 'NotPlayable' && (
        <div
          className={`flex ${height} ${width} items-center justify-center rounded-xl border-2 border-tertiary-color bg-fifth-color `}
        >
          <div className="text-base font-medium text-quaternary-color">
            Something is wrong with the link
          </div>
        </div>
      )}
    </div>
  );
};

export default NoPreview;
