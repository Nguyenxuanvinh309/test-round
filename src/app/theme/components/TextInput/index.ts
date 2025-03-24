import type { MantineThemeComponent } from '@mantine/core';
import { TextInput } from '@mantine/core';
import inputClasses from './TextInput.module.scss';

const TextInputTheme: MantineThemeComponent = TextInput.extend({
  defaultProps: {},
  classNames: inputClasses,
});

export default TextInputTheme;
