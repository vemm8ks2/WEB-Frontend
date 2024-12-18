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

interface CreateProductDTO
  extends Pick<Product, "title" | "imageUrl" | "price"> {
  categoryId: string;
  productOptions: Omit<ProductOption, "id">[];
}

interface State {
  products: Product[];
  isLoading: boolean;
  getProducts: () => void;
  createProduct: (
    params: {
      token: string;
    } & CreateProductDTO
  ) => Promise<{ message: string; statusCode: number }>;
}

export const useProductStore = create<State>((set) => ({
  products: [],
  isLoading: false,
  getProducts: async () => {
    set({ isLoading: true });

    try {
      const res = await fetch("http://localhost:5454/api/public/product");
      const data = await res.json();

      set({ products: data });
    } catch (e) {
      console.log(e);
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
