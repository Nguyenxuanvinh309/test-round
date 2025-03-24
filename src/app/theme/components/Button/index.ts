import type { MantineThemeComponent } from '@mantine/core';
import { Button as MantineButton } from '@mantine/core';
import inputClasses from './Button.module.scss';

const labelStyle = {
  sm: {
    fontSize: 12,
    fontWeight: 500,
  },
  md: {
    fontSize: 14,
    fontWeight: 500,
  },
  lg: {
    fontSize: 16,
    fontWeight: 500,
  },
};

const ButtonTheme: MantineThemeComponent = MantineButton.extend({
  defaultProps: {
    radius: 'md',
    size: 'md',
  },
  vars: (_, props) => {
    const { size = 'md' } = props;
    return {
      root: {},
      label: labelStyle[size as keyof typeof labelStyle],
    };
  },
  classNames: inputClasses,
});

export default ButtonTheme;
