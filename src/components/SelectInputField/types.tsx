export interface InputAndOutputTypes {
  MarginTop?: string;
  title: string | undefined;
  width: string;
  height?: string;
  height1?: string;
  value?: string;
  onChange: (selectedValue: string) => void;
  error?: string;
  onInputError?: (hasError: boolean) => void;
  rtspValidation?: boolean;
  options?: Option[] | undefined;
  onSelectOption?: (value: string) => void;
  initialSelect?: string;
  resetButton?: boolean;
  disableInput?: boolean;
}
type Option = {
  id: number;
  name: string;
};
