import type { MantineThemeComponents } from '@mantine/core';
import TextTheme from './Text';
import TextInputTheme from './TextInput';
import PasswordInput from './PasswordInput';
import ButtonTheme from './Button';
import Checkbox from './Checkbox';
import SelectTheme from './Select';
import DateInputTheme from './DateInput';
import ModalTheme from './Modal';
import NotificationTheme from './Notification';

const components: MantineThemeComponents = {
  Text: TextTheme,
  TextInput: TextInputTheme,
  PasswordInput: PasswordInput,
  Button: ButtonTheme,
  Modal: ModalTheme,
  Checkbox: Checkbox,
  Select: SelectTheme,
  DateInput: DateInputTheme,
  Notification: NotificationTheme,
};

export default components;
