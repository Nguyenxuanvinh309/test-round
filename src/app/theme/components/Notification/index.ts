import type { CSSProperties, MantineThemeComponent } from '@mantine/core';
import { Notification as MantineToast } from '@mantine/core';

const NotificationTheme: MantineThemeComponent = MantineToast.extend({
  defaultProps: {},
  styles(theme, props) {
    const { color } = props;

    const customRoot: CSSProperties = {
      alignItems: 'flex-start',
    };

    const customTitleStyle: CSSProperties = {
      fontSize: 16,
      lineHeight: 1.5,
    };

    const customIconStyle: CSSProperties = {
      backgroundColor: 'unset',
      width: 24,
      height: 27,
    };
    const customDescriptionStyle: CSSProperties = {
      color: theme.colors.gray[6],
    };

    if (color === 'success') {
      return {
        root: {
          ...customRoot,
          backgroundColor: theme.colors.success[1],
          borderColor: theme.colors.success[2],
        },
        title: {
          ...customTitleStyle,
          color: theme.colors.success[3],
        },
        description: customDescriptionStyle,
        icon: customIconStyle,
      };
    }
    if (color === 'error') {
      return {
        root: {
          ...customRoot,
          backgroundColor: theme.colors.error[1],
          borderColor: theme.colors.error[2],
        },
        title: {
          ...customTitleStyle,
          color: theme.colors.error[3],
        },
        description: customDescriptionStyle,
        icon: customIconStyle,
      };
    }
    if (color === 'status') {
      return {
        root: {
          ...customRoot,
          backgroundColor: theme.colors.info[1],
          borderColor: theme.colors.info[2],
        },
        title: {
          ...customTitleStyle,
          color: theme.colors.info[3],
        },
        description: customDescriptionStyle,
        icon: customIconStyle,
      };
    }
    if (color === 'warning') {
      return {
        root: {
          ...customRoot,
          backgroundColor: theme.colors.warning[1],
          borderColor: theme.colors.warning[2],
        },
        title: {
          ...customTitleStyle,
          color: theme.colors.warning[3],
        },
        description: customDescriptionStyle,
        icon: customIconStyle,
      };
    }

    return {};
  },
});

export default NotificationTheme;
