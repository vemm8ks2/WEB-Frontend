import { create } from "zustand";

import type { ApiResponse, Page } from "@/types/api";
import type { Order } from "@/types/order";

interface State {
  data?: Page<Order>;
  isLoading: boolean;
  getOrder: (params: { token: string; page?: number; size?: number }) => void;
}

export const useOrderStore = create<State>((set) => ({
  data: undefined,
  isLoading: false,
  getOrder: async ({ token, page = 0, size = 10 }) => {
    set({ isLoading: true });

    try {
      const currPage = page >= 0 ? page : 0;
      const currSize = size > 0 ? size : 10;

      const res = await fetch(
        `http://localhost:5454/api/admin/order?page=${currPage}&size=${currSize}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data }: ApiResponse<Page<Order>> = await res.json();

      set({ data });
    } catch (e) {
      console.error(e);
    }

    set({ isLoading: false });
  },
}));
