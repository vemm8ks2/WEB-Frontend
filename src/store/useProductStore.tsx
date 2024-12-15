import { create } from "zustand";

interface Category {
  id: string;
  name: string;
  level: number;
  parentCategory: Category;
}

export interface ProductOption {
  id: number;
  stock: number;
  size: number | string;
}

export interface Product {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  active: boolean;
  category: Category;
  productOptions: ProductOption[];
}

interface State {
  products: Product[];
  isLoading: boolean;
  getProducts: () => void;
}

export const useProductStore = create<State>((set) => ({
  products: [],
  isLoading: false,
  getProducts: async () => {
    try {
      const res = await fetch("http://localhost:5454/api/public/product");
      const data = await res.json();

      set({ products: data });
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });
  },
}));
