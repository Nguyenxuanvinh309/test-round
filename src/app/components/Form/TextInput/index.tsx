/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';
import React from 'react';
import type { TextInputProps as MantineTextInputProps } from '@mantine/core';
import { Box, TextInput as MantineTextInput } from '@mantine/core';
import { useController } from 'react-hook-form';
import type { FieldPath, Control, FieldValues } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { Description, Label } from '..';

type TextInputProps<
  TFormValues extends FieldValues = FieldValues,
  TPath extends FieldPath<TFormValues> = FieldPath<TFormValues>,
> = {
  control: Control<TFormValues>;
  name: TPath;
  label?: React.ReactNode | string;
  extra?: React.ReactNode | string;
  format?: string;
  transformValue?: (value: string) => string;
  keepFormatted?: boolean;
  onChangeValue?: (value: React.ChangeEventHandler<HTMLInputElement> | string | number) => void;
} & Omit<MantineTextInputProps, 'value' | 'name' | 'label' | 'onChange'>;

const TextInput = <TFormValues extends FieldValues, TPath extends FieldPath<TFormValues>>({
  name,
  control,
  required,
  format,
  type,
  defaultValue,
  maxLength,
  label,
  keepFormatted,
  onChangeValue,
  ...props
}: TextInputProps<TFormValues, TPath>) => {
  const {
    field: { ref, onChange, value, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  if (format) {
    return (
      <PatternFormat
        {...field}
        customInput={MantineTextInput}
        description={!!error?.message && <Description error={error?.message} />}
        descriptionProps={{
          component: Box,
        }}
        error={!!error?.message}
        format={format}
        getInputRef={ref}
        inputWrapperOrder={['label', 'input', 'error', 'description']}
        label={label && <Label label={label} required={required} />}
        onValueChange={(values) => {
          if (keepFormatted) {
            onChange(values.formattedValue);
          } else onChange(values.value);
        }}
        value={value}
        {...props}
      />
    );
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = e.target.value;
    if (maxLength && val.length > maxLength) {
      onChangeValue && onChangeValue(val.slice(0, maxLength));
    } else {
      onChangeValue && onChangeValue(val);
    }
  };

  return (
    <MantineTextInput
      {...field}
      defaultValue={defaultValue}
      description={
        !!error?.message ? (
          <Description error={error?.message} valueLength={(value || '').length} />
        ) : (
          maxLength && <Description error={error?.message} maxLength={maxLength} valueLength={(value || '').length} />
        )
      }
      descriptionProps={{
        component: Box,
      }}
      error={!!error?.message}
      inputWrapperOrder={['label', 'input', 'error', 'description']}
      label={label && <Label label={label} required={required} />}
      leftSectionWidth={24}
      onChange={handleChange}
      ref={ref}
      rightSectionWidth={24}
      type={type}
      value={value || ''}
      {...props}
    />
  );
};

export default TextInput;
