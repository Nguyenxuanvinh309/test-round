export interface ICurrency {
  currency: string,
  date: string,
  image: string,
  index: number,
  price: number,
}
export type State = {
  loading: boolean;
  error?: {
    code: number,
    message: string,
  };
  data: {
    code: 200,
    data: ICurrency[]
  } | undefined
};

export type Action = {
  updateLoading: (loading: State['loading']) => void,
  updateError: (error: State['error']) => void,
  updateData: (error: State['data']) => void,
  reset: () => void
};