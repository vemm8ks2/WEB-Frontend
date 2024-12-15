import { create } from "zustand";
import { Product } from "@/store/useProductStore";
import { ResponseUser } from "@/store/useAuthStore";

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
      const res = await fetch("http://localhost:5454/api/user/cart", {
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
      const res = await fetch("http://localhost:5454/api/user/cart-item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      });
      const data: ResponseCartItem = await res.json();
      console.log(data);

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
      const res = await fetch(
        `http://localhost:5454/api/user/cart-item/delete/${cartItemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const res = await fetch(
        `http://localhost:5454/api/user/cart-item/modify/${cartItemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(quantity),
        }
      );
      const data = await res.json();

      set({ data });
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });
  },
}));
