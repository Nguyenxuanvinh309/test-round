import { AxiosResponse } from 'axios';
import ApiInstance from '@/utils/api';
class CurrencyService extends ApiInstance {
  constructor(protected apiUrl: string) {
    super(apiUrl);
  }

  getCurrencyList = (): Promise<AxiosResponse> => {
    return this.get(`api/currency`, {});
  };

  getCurrencyQuery = (params: unknown): Promise<AxiosResponse> => {
    return this.post(`api/currency`, {
      payload: params
    });
  };
}

const service = new CurrencyService('');
export default service;
