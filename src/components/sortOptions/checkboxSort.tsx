import React, { useState } from 'react';

import Checkbox from '../checkbox/checkbox';
import type { SortOptionsTypes } from './types';

const CheckboxSort = (props: SortOptionsTypes) => {
  const [checkbox, setCheckbox] = useState(false);

  return (
    <div>
      <div className="mt-[3px]">
        <Checkbox
          backgroundColor=""
          id={`${props.id}`}
          type="Square"
          button={checkbox}
          onClick={() => {
            setCheckbox(!checkbox);
          }}
        />
      </div>
    </div>
  );
};

export default CheckboxSort;
