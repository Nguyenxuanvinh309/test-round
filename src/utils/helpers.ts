/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import _forOwn from 'lodash/forOwn';

const Helper = {
  toastr: (description: string, message: string, type = 'success', duration = 5000): void => {
    if (type === 'success') {
      toast.success(message, { autoClose: duration });
    } else if (type === 'error') {
      toast.error(message, { toastId: description, autoClose: duration });
    }
  },
  getUrl(url: string, apiUrl: string): string {
    return (url.startsWith('http') ? '' : apiUrl) + url;
  },
};

export default Helper;
