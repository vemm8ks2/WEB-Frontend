import { create } from "zustand";

import type { ApiResponse, Page } from "@/types/api";
import type { Product, ProductOption } from "@/types/product";

interface CreateProductDTO
  extends Pick<Product, "title" | "imageUrl" | "price"> {
  categoryId: string;
  productOptions: Omit<ProductOption, "id">[];
}

interface State {
  data?: Page<Product>;
  isLoading: boolean;
  getProduct: (params: { token: string; page?: number; size?: number }) => void;
  createProduct: (
    params: {
      token: string;
    } & CreateProductDTO
  ) => Promise<{ message: string; statusCode: number }>;
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
  createProduct: async (params) => {
    const { token, title, price, imageUrl, categoryId, productOptions } =
      params;

    const result = { message: "", statusCode: -1 };

    set({ isLoading: true });

    try {
      const res = await fetch("http://localhost:5454/api/admin/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          price,
          imageUrl,
          categoryId,
          productOptions,
        }),
      });
      const data = await res.json();

      result.message = data.message;
      result.statusCode = res.status;
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });

    return result;
  },
}));
