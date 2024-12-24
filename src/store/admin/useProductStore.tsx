import { create } from "zustand";

import type { ApiResponse, Page } from "@/types/api";
import type { Product } from "@/types/product";

interface State {
  data?: Page<Product>;
  isLoading: boolean;
  getProduct: (params: { token: string; page?: number; size?: number }) => void;
}

export const useProductStore = create<State>((set) => ({
  data: undefined,
  isLoading: false,
  getProduct: async ({ token, page = 0, size = 10 }) => {
    set({ isLoading: true });

    try {
      const currPage = page >= 0 ? page : 0;
      const currSize = size > 0 ? size : 10;

      const res = await fetch(
        `http://localhost:5454/api/admin/product?page=${currPage}&size=${currSize}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data }: ApiResponse<Page<Product>> = await res.json();

      set({ data });
    } catch (e) {
      console.error(e);
    }

    set({ isLoading: false });
  },
}));
