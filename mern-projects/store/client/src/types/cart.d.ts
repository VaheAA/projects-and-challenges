import { IProduct } from './product';

export interface ICart {
  procuts: IProduct[];
  totalPrice: number;
}

export type CartContextType = {
  addToCart: (product: IProduct) => void;
  deleteFromCart: (productId: number) => void;
  clearCart: () => void;
};
