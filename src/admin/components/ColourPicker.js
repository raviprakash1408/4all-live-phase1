import { SketchPicker } from "react-color";

const ColourPicker = ({ color, onChangeMethod, handleChangeComplete }) => {
  return (
    <SketchPicker
      color={color}
      onChange={onChangeMethod}
      onChangeComplete={handleChangeComplete}
    />
  );
};

export default ColourPicker;
