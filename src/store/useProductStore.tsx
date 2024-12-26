import { create } from "zustand";

import type { Product } from "@/types/product";
import type { ApiResponse, Page } from "@/types/api";

interface State {
  products?: Page<Product>;
  isLoading: boolean;
  getProducts: (params: {
    categoryId?: string;
    keyword?: string;
    page?: number;
    size?: number;
  }) => void;
}

export const useProductStore = create<State>((set) => ({
  products: undefined,
  isLoading: false,
  getProducts: async ({ categoryId, keyword, page = 0, size = 10 }) => {
    set({ isLoading: true });

    try {
      const currPage = page >= 0 ? page : 0;
      const currSize = size > 0 ? size : 10;

      let endpoint = `http://localhost:5454/api/public/product?page=${currPage}&size=${currSize}`;

      if (categoryId) endpoint += `&category_id=${categoryId}`;
      if (keyword) endpoint += `&keyword=${keyword}`;

      const res = await fetch(endpoint, {
        headers: { "Content-Type": "application/json" },
      });
      const { data }: ApiResponse<Page<Product>> = await res.json();

      set({ products: data });
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });
  },
}));
