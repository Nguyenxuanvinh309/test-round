import type { MantineThemeComponent } from '@mantine/core';
import { Checkbox as MantineCheckbox } from '@mantine/core';
import inputClasses from './Checkbox.module.scss';

const Checkbox: MantineThemeComponent = MantineCheckbox.extend({
  defaultProps: {},
  classNames: inputClasses,
});

export default Checkbox;
