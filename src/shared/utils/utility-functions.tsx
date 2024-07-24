import { toast } from 'react-toastify';

import { IResponse } from '../shared.interface';

export const searchData = (data: IResponse[], searchText: string) => {
  if (!searchText) {
    return data;
  }
  searchText = searchText.toLowerCase();
  return data.filter(
    (item: IResponse) =>
      item.name.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText) ||
      item.role.toLowerCase().includes(searchText)
  );
};

export const showSuccessToast = (message: string): void => {
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored'
  });
};

export const showErrorToast = (message: string): void => {
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored'
  });
};
