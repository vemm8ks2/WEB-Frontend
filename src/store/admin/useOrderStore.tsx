import { create } from "zustand";

import type { ApiResponse, Page } from "@/types/api";
import type { Order } from "@/types/order";

interface State {
  data?: Page<Order>;
  allData?: Order[];
  isLoading: boolean;
  getOrder: (params: { token: string; page?: number; size?: number }) => void;
  getAllOrder: (params: { token: string }) => void;
}

export const useOrderStore = create<State>((set) => ({
  data: undefined,
  isLoading: false,
  getOrder: async ({ token, page = 0, size = 10 }) => {
    set({ isLoading: true });

    try {
      const currPage = page >= 0 ? page : 0;
      const currSize = size > 0 ? size : 10;

      const endpoint = `${
        import.meta.env.VITE_API_URL
      }/admin/order?page=${currPage}&size=${currSize}`;

      const res = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data }: ApiResponse<Page<Order>> = await res.json();

      set({ data });
    } catch (e) {
      console.error(e);
    }

    set({ isLoading: false });
  },
  getAllOrder: async ({ token }) => {
    set({ isLoading: true });

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/admin/order/all`;

      const res = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data }: ApiResponse<Order[]> = await res.json();

      set({ allData: data });
    } catch (e) {
      console.error(e);
    }

    set({ isLoading: false });
  },
}));
