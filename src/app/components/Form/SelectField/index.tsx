/* eslint-disable @typescript-eslint/no-unused-expressions */
import type { SelectProps } from '@mantine/core';
import { Select } from '@mantine/core';
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';

import Description from '../Description';
import Label from '../Label';

interface SelectFieldProps<TFormValues extends FieldValues> extends SelectProps {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label?: React.ReactNode;
  extra?: React.ReactNode;
  required?: boolean;
  onChangeValue?: (value: string | null) => void;
}

const SelectField = <TFormValues extends FieldValues>({
  name,
  control,
  required,
  maxLength,
  label,
  onChangeValue,
  ...props
}: SelectFieldProps<TFormValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Select
      {...field}
      checkIconPosition="right"
      description={
        error?.message ? (
          <Description error={error?.message} />
        ) : (
          maxLength && (
            <Description error={error?.message} maxLength={maxLength} valueLength={(field.value || '').length} />
          )
        )
      }
      error={!!error?.message}
      inputWrapperOrder={['label', 'input', 'error', 'description']}
      label={label && <Label label={label} required={required} />}
      maxDropdownHeight={256}
      value={field.value || ''}
      {...props}
      onChange={(value) => {
        field.onChange(value);
        onChangeValue && onChangeValue(value);
      }}
    />
  );
};

export default SelectField;
