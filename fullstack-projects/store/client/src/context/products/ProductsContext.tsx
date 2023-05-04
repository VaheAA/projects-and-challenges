import { createContext, ReactNode, useState } from 'react';
import { IProduct, ProductContextType } from '../../types/product';


type ContextProps = {
  children: ReactNode;
};

export const ProductsContext = createContext<ProductContextType | null>(null);


export const ProductsProvider: React.FC<ContextProps> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);


  const getProducts = async (url: string): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.data);
      setNumOfPages(data.numOfPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        getProducts,
        numOfPages
      }}>
      {children}
    </ProductsContext.Provider>
  );
};