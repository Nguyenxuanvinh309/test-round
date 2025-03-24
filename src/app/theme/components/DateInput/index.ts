import type { MantineThemeComponent } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import classes from './DateInput.module.scss';

const DateInputTheme: MantineThemeComponent = DateInput.extend({
  defaultProps: {
    radius: 'md',
    size: 'md',
    rightSectionWidth: 40,
  },
  classNames: classes,
});

export default DateInputTheme;
