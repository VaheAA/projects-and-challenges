import { IProduct } from './product';

export type CartContextType = {
  products: IProduct[];
  totalPrice: number;
  open: boolean;
  toggleCart: () => void;
  addToCart: (product: IProduct) => void;
  deleteFromCart: (productId: number) => void;
  clearCart: () => void;
};
