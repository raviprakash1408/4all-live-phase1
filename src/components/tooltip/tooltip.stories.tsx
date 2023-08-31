import Tooltip from '.';

export default {
  component: Tooltip,
  title: 'Tooltip',
  tags: ['Tooltip'],
};

export const Default = () => (
  <div className="mt-10">
    <Tooltip
      text="This is a tooltip"
      backgroundColor="bg-secondary-color"
      bordertopcolor="border-t-secondary-color"
      textcolor="text-font-color"
    >
      <button
        type="button"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
      >
        Hover me
      </button>
    </Tooltip>
  </div>
);
