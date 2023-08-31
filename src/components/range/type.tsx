export interface RangeSliderType {
  progress: number;
  type: 'withoutThumb' | 'withThumb' | 'thumbBorder';
  width: string;
  textSide: string;
  dataType: string;
  rangeDisabled?: boolean;
  textMargin?: string;
  onChange?: (value: number) => void;
  rangeColor?: string;
  hoverColor?: string;
}
