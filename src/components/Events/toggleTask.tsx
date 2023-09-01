import React from 'react';

import Checkbox from '../checkbox/checkbox';
import type { CheckBoxTypes } from '../checkbox/types';

const ToggleTask = (props: CheckBoxTypes) => {
  // const [checkbox, setCheckbox] = useState(false);

  return (
    <div>
      <div className="mt-2">
        <Checkbox
          backgroundColor=""
          id={props.id}
          type="Square"
          button={props.button}
          onClick={() => {
            if (props.onClick) {
              props.onClick();
            }
          }}
        />
      </div>
    </div>
  );
};

const ToggleCheckbox = (props: {
  id: string;
  title: string;
  onToggleClick: (id: number, title: string) => void;
  button?: boolean;
  // onClick?: () => void;
}) => {
  return (
    <div>
      <div className="mt-1">
        <Checkbox
          backgroundColor=""
          id={props.id}
          type="Circle"
          button={props.button}
          onClick={() => {
            if (props.id) {
              props.onToggleClick(parseInt(props.id, 10), props.title);

              console.log('button', props.onToggleClick);
            }

            // console.log(`fileDeleting (${props.id}):`, !fileDeleting);
          }}
        />
      </div>
    </div>
  );
};
export { ToggleCheckbox, ToggleTask };
// export default { ToggleCheckbox, ToggleTask };
