export enum ColorThemes {
  'primary-color' = 'primary-color',
  'secondary-color' = 'secondary-color',
  'tertiary-color' = 'tertiary-color',
  'quaternary-color' = 'quaternary-color',
  'fifth-color' = 'fifth-color',
}
export const names = Object.keys(ColorThemes).filter((v) => {
  return Number.isNaN(Number(v));
});
