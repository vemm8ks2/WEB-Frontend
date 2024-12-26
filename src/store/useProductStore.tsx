import { create } from "zustand";

import type { Product } from "@/types/product";
import type { ApiResponse, Page } from "@/types/api";

interface State {
  products?: Page<Product>;
  isLoading: boolean;
  getProducts: (params: { page?: number; size?: number }) => void;
}

export const useProductStore = create<State>((set) => ({
  products: undefined,
  isLoading: false,
  getProducts: async ({ page = 0, size = 10 }) => {
    set({ isLoading: true });

    try {
      const currPage = page >= 0 ? page : 0;
      const currSize = size > 0 ? size : 10;

      const res = await fetch(
        `http://localhost:5454/api/public/product?page=${currPage}&size=${currSize}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const { data }: ApiResponse<Page<Product>> = await res.json();

      set({ products: data });
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });
  },
}));
