import { InferType, object } from 'yup';
import * as yup from 'yup';

const schema = object({
  currencyPrice: yup.number()
    .min(1)
    .typeError('Invalid field')
    .required('Required field'),
  currencyConvertPrice: yup.number()
    .typeError('Invalid field')
    .required('Required field'),
  selectedCurrency: yup.string().required('Required field'),
  convertCurrency: yup.string().required('Required field'),
});

export default schema;
export type CurrencyType = InferType<typeof schema>;
