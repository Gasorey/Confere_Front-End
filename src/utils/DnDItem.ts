import { string } from 'yup';

export const items = {
  PAYMENT: 'payment',
  changeStatus: {
    id: string,
    description: string,
    status: string,
  },
};
