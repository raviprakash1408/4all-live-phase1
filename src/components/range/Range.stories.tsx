import RangeSlider from '.';

export default {
  component: RangeSlider,
  title: 'RangeSlider',
  tags: ['RangeSlider'],
};
export const Default = () => (
  <RangeSlider
    progress={40}
    type="withoutThumb"
    width="w-48"
    textSide="up"
    dataType="%"
  />
);
