import { Troubleshoot } from '@mui/icons-material';
import { createContext, ReactNode, useState } from 'react';
import { CartContextType } from '../../types/cart';
import { IProduct } from '../../types/product';


type ContextProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<ContextProps> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);


  const addToCart = (product: IProduct) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts, product];

      setTotalPrice(() => {
        return updatedProducts.map(product => product.price).reduce((acc, curr) => acc + curr);
      });
      return updatedProducts;
    });

  };

  const deleteFromCart = (id: number) => {
    setProducts(prevProducts => {

      const updatedProducts = prevProducts.filter(product => product._id !== id);

      if (updatedProducts.length > 0) {
        setTotalPrice(() => {
          return updatedProducts.map(product => product.price).reduce((acc, curr) => acc + curr);
        });

      }

      if (updatedProducts.length === 0) {
        setTotalPrice(0);
        setOpen(false);
      }

      return updatedProducts;
    });
  };

  const clearCart = () => {
    setProducts([]);
    setTotalPrice(0);
    setOpen(false);
  };

  const toggleCart = () => {
    setOpen((prev) => !prev);
  };


  return (
    <CartContext.Provider value={{
      products,
      totalPrice,
      addToCart,
      clearCart,
      deleteFromCart,
      open,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
};