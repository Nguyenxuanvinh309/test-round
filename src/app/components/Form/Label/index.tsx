import type { GroupProps } from '@mantine/core';
import { Group, Text } from '@mantine/core';
import type { ReactNode } from 'react';

const FormLabel = ({
  label,
  required,
  ...rest
}: {
  label: ReactNode;
  required?: boolean;
} & GroupProps) => {
  return (
    <Group gap={2} justify="flex-start" mb={8} {...rest}>
      <Text c="gray.6" fw={400} style={{ fontSize: 14 }}>
        {label}
      </Text>
      {!!required && (
        <Text c="red.3" fw={700} style={{ fontSize: 14 }}>
          ※
        </Text>
      )}
    </Group>
  );
};

export default FormLabel;
