import type { MantineThemeComponent } from '@mantine/core';
import { PasswordInput as MantinePasswordInput } from '@mantine/core';
import inputClasses from './PasswordInput.module.scss';

const PasswordInput: MantineThemeComponent = MantinePasswordInput.extend({
  defaultProps: {},
  classNames: inputClasses,
});

export default PasswordInput;
