import React from 'react';

import Toast from '.';

const TestToast = () => {
  return (
    <div>
      <button type="button" className="">
        <Toast
          type="warning"
          heading="Settings Saved"
          message="Successfully saved"
        />
      </button>
    </div>
  );
};

export default TestToast;
