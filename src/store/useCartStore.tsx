import { create } from "zustand";

import { ResponseUser } from "@/store/useAuthStore";

import type { Product } from "@/types/product";

interface ResponseCart {
  id: number;
  cartItems: ResponseCartItem[];
  user: ResponseUser;
}

export interface ResponseCartItem {
  id: number;
  quantity: number;
  size: string;
  product: Product;
}

interface CartItemParams {
  id?: number;
  quantity: number;
  size: string;
  cartId: number;
  product: Pick<Product, "id">;
}

interface State {
  data?: ResponseCart;
  isLoading: boolean;
  getCart: (params: { token: string }) => void;
  addCartItem: (params: {
    token: string;
    cartItem: Omit<CartItemParams, "cartId">;
  }) => void;
  removeCartItem: (params: { token: string; cartItemId: string }) => void;
  removeAllCartItem: (params: { token: string }) => void;
  updateQuantity: (params: {
    token: string;
    cartItemId: string;
    quantity: number;
  }) => void;
}

export const useCartStore = create<State>((set) => ({
  data: undefined,
  isLoading: false,
  getCart: async ({ token }) => {
    set({ isLoading: true });

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/user/cart`;

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: ResponseCart = await res.json();

      set({ data });
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });
  },
  addCartItem: async ({ token, cartItem }) => {
    set({ isLoading: true });

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/user/cart-item`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      });
      const data: ResponseCartItem = await res.json();

      set((prev) => {
        if (!prev.data) return prev;

        return {
          ...prev,
          data: {
            ...prev.data,
            cartItems: [
              ...prev.data.cartItems.filter((item) => item.id !== data.id),
              data,
            ],
          },
        };
      });
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });
  },
  removeCartItem: async ({ token, cartItemId }) => {
    set({ isLoading: true });

    try {
      const endpoint = `${
        import.meta.env.VITE_API_URL
      }/user/cart-item/delete/${cartItemId}`;

      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      set({ data });
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });
  },
  removeAllCartItem: async ({ token }) => {
    set({ isLoading: true });

    try {
      const endpoint = `${
        import.meta.env.VITE_API_URL
      }/user/cart-item/delete/all`;

      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      set({ data });
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });
  },
  updateQuantity: async ({ token, cartItemId, quantity }) => {
    set({ isLoading: true });

    try {
      const endpoint = `${
        import.meta.env.VITE_API_URL
      }/user/cart-item/modify/${cartItemId}`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quantity),
      });
      const data = await res.json();

      set({ data });
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });
  },
}));
