import { Text, type MantineThemeComponent } from '@mantine/core';
import styles from './styles.module.css';

const TextTheme: MantineThemeComponent = Text.extend({
  defaultProps: {},
  classNames: styles,
});

export default TextTheme;
