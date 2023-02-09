// @types.todo.ts
export interface IProduct {
  _id: number;
  name: string;
  price: number;
  featured: boolean;
  rating: number;
  createdAt: Date;
  company: string;
}

export type ProductContextType = {
  products: IProduct[];
  getProducts: (url: string) => Promise<void>;
  numOfPages: number;
  loading: boolean;
};