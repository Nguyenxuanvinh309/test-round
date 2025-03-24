import type { DefaultMantineColor, MantineColorsTuple, MantineThemeColors } from '@mantine/core';
import { DEFAULT_THEME } from '@mantine/core';

const extra = {
  primary: [
    '#EAF7FF',
    '#D6E7FF',
    '#C2DBFF',
    '#ADCFFF',
    '#99C3FF',
    '#2F79EA',
    '#0050C9',
    '#0041A3',
    '#00398F',
    '#002152',
  ],
  gray: ['#FFFFFF', '#F0F3F6', '#E6EBF0', '#D9E1E9', '#C3CBD2', '#A8B3BD', '#757A79', '#4A504E', '#101211'],
  blue: ['#FFFFFF', '#E6F2FF', '#b3d7ff', '#007AFF'],
  green: ['#FFFFFF', '#e8f7f0', '#b9e7d1', '#15AE67'],
  red: ['#FFFFFF', '#FDF0ED', '#f8d1c8', '#E96449'],
  yellow: ['#FFFFFF', '#fdf5e6', '#f9e1b3', '#EA9B00'],
  info: ['#FFFFFF', '#E1EFFA', '#D3E7F8', '#3B6D96'],
  warning: ['#FFFFFF', '#FAEBD3', '#F7E2BD', '#8A621E'],
  success: ['#FFFFFF', '#D8F2E8', '#C4ECDD', '#37735C'],
  error: ['#FFFFFF', '#FFE6E8', '#FFDADD', '#B63C44'],
};

type Colors = keyof typeof extra;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<Colors | DefaultMantineColor, MantineColorsTuple>;
  }
}

const colors = Object.keys(extra).reduce(
  (acc, curr) => {
    return {
      ...acc,
      [curr]: extra[curr as Colors],
    };
  },
  { ...DEFAULT_THEME.colors },
);

export default colors as MantineThemeColors;
