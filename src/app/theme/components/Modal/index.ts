import type { MantineThemeComponent } from '@mantine/core';
import { Modal as MantineModal } from '@mantine/core';
import inputClasses from './Modal.module.scss';

const ModalTheme: MantineThemeComponent = MantineModal.extend({
  defaultProps: {
    size: 26,
  },
  classNames: inputClasses,
});

export default ModalTheme;
