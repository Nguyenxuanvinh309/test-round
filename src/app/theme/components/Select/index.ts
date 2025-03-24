import type { MantineThemeComponent } from '@mantine/core';
import { Select as MantineSelect } from '@mantine/core';
import inputClasses from './SelectInput.module.scss';

const SelectTheme: MantineThemeComponent = MantineSelect.extend({
  defaultProps: {},
  classNames: inputClasses,
});

export default SelectTheme;
