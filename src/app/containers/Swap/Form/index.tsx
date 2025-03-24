// components/ContactForm.js
"use client"; // Required for client-side interactivity in Next.js
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import schema from "../model/schema";
import SelectField from "@/app/components/Form/SelectField";
import { Group, SelectProps } from "@mantine/core";
import {
  IconTransferVertical,
  IconCheck,
} from '@tabler/icons-react';
import TextInput from '@/app/components/Form/TextInput';
import { currencyQueryRequest } from '../action';
import { ICurrency } from '../store/type';
import { ChangeEventHandler } from 'react';

type Props = {
  initialValues?: {
    label: string,
    value: string
  }[]
}

const Form = ({
  initialValues
}: Props) => {
  const { control, watch, setValue, resetField } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      selectedCurrency: initialValues?.[0].value,
      convertCurrency: initialValues?.[1].value
    }
  });

  const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
    <Group flex="1" gap="xs">
      <Image
        className="dark:invert border-solid border rounded-full"
        src={`./icons/${option.label}.svg`}
        alt={option.label}
        width={24}
        height={24}
        priority
      />
      {option.label}
      {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
    </Group>
  );

  const handleRequestPrice = async (value: string | number | ChangeEventHandler<HTMLInputElement>) => {
    const requestCurrency = await currencyQueryRequest({
      params: watch('selectedCurrency')
    });
    const res: Partial<{
      data: ICurrency[]
    }> = requestCurrency || {};
    const { data } = res;
      
    setValue('currencyPrice', value as number);
    const convertPrice = (data?.[0].price || 0) * ((value || 0) as number);
    if (isNaN(convertPrice)) {
      resetField('currencyConvertPrice');
    } else {
      setValue('currencyConvertPrice', convertPrice as number);
    }
  }

  return (
    <form className='bg-[#2E1A2C] p-10 rounded-[8px]'>
      <div className='flex mb-[12px] bg-pink-400 p-4 rounded-[8px]'>
        <TextInput 
          name="currencyPrice"
          control={control}
          placeholder='Amount'
          onChangeValue={(value) => {
            handleRequestPrice(value);
          }}
        />
        <SelectField
          control={control}
          data={initialValues}
          name="selectedCurrency"
          placeholder="Select currency"
          style={{
            flexGrow: 1,
            input: {
              borderLeftColor: 'transparent',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              '&:hover, &:focus': {
                borderLeftColor: 'transparent',
              },
            },
            width: 150,
            marginLeft: 10,
          }}
          leftSection={
            watch('selectedCurrency') && <Image
              className="dark:invert border-solid border rounded-full"
              src={`./icons/${watch('selectedCurrency')}.svg`}
              alt={watch('selectedCurrency')}
              width={24}
              height={24}
              priority
            />
          }
          renderOption={renderSelectOption}
          onChangeValue={(value) => {
            if (watch('convertCurrency') === value) {
              setValue('selectedCurrency', initialValues?.[0].value as string);
              setValue('convertCurrency', initialValues?.[1].value as string);
            }
            resetField('currencyPrice');
            resetField('currencyConvertPrice');
          }}
        />
      </div>

      <div className='flex justify-center'>
        <IconTransferVertical
          size={30}
          stroke={1.5}
          color="white"
          style={{
            cursor: 'pointer'
          }}
          onClick={() => {
            const convertCurrency = watch('convertCurrency');
            const selectedCurrency = watch('selectedCurrency');
            setValue('selectedCurrency', convertCurrency as string);
            setValue('convertCurrency', selectedCurrency as string);
            handleRequestPrice(watch('currencyPrice'));
          }}
        />
      </div>
    
      <div className='flex mt-[12px] bg-pink-400 p-4 rounded-[8px]'>
        <TextInput name="currencyConvertPrice" control={control} placeholder='Amount' readOnly />
        <SelectField
          control={control}
          data={initialValues}
          name="convertCurrency"
          placeholder="Select currency"
          style={{
            flexGrow: 1,
            input: {
              borderLeftColor: 'transparent',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,

              '&:hover, &:focus': {
                borderLeftColor: 'transparent',
              },
            },
            width: 150,
            marginLeft: 10
          }}
          leftSection={
            watch('convertCurrency') && <Image
              className="dark:invert border-solid border rounded-full"
              src={`./icons/${watch('convertCurrency')}.svg`}
              alt={watch('convertCurrency')}
              width={24}
              height={24}
              priority
            />
          }
          renderOption={renderSelectOption}
          onChangeValue={(value) => {
            if (watch('selectedCurrency') === value) {
              setValue('selectedCurrency', initialValues?.[0].value as string);
              setValue('convertCurrency', initialValues?.[1].value as string);
            }
            resetField('currencyPrice');
            resetField('currencyConvertPrice');
          }}
        />
      </div>
    </form>
  );
};
export default Form;