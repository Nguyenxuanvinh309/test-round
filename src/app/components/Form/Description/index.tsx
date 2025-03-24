'use client';
import { Box, Group, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import React from 'react';

const FormDescription = ({
  error,
  valueLength,
  maxLength,
}: {
  error?: string;
  valueLength?: number;
  maxLength?: number;
}) => {
  return (
    <Box
      animate={{ opacity: 1, height: 'auto' }}
      component={motion.div}
      display="flex"
      initial={error ? { opacity: 0, height: 0 } : {}}
      mt={4}
      style={{ justifyContent: 'space-between', gap: 10 }}
      transition={{ duration: 0.1 }}
    >
      <Group align="flex-start" gap={4}>
        <Text
          fz={{ base: 'xs', sm: 'sm' }}
          lh="20px"
          style={{ flex: 1, fontSize: 14, color: 'red' }}
        >
          {error}
        </Text>
      </Group>
      {!!maxLength && (
        <Text
          fw={400}
          fz={{ base: 'xs', sm: 'sm', color: 'red' }}
          lh="20px"
        >
          {valueLength || 0}/{maxLength}
        </Text>
      )}
    </Box>
  );
};

export default FormDescription;
