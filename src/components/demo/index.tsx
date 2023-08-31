import type DemoTypes from './types';

const Demo = (props: DemoTypes) => {
  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`bg-${props.bg_color} text-${props.font_color} border-${props.border_color} rounded `}
    >
      Demo
    </div>
  );
};

export default Demo;
