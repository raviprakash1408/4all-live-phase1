import create from 'zustand';

import colorPallete from '../../public/api/colorPallete.json';

interface ThemeState {
  isDarkMode: boolean;
  colorPallete: {};
  toggleDarkMode: () => void;
}

const useTheme = create<ThemeState>((set) => ({
  isDarkMode: false,
  colorPallete,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

export default useTheme;
