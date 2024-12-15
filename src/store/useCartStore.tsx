import { create } from "zustand";

interface ResponseCart {
  cartItem: [];
  id: number;
  totalPrice: number;
}

interface CartItem {
  price: number;
  quantity: number;
  totalPrice: number;
  cartId: number;
  productId: number;
}

interface State {
  data?: ResponseCart;
  isLoading: boolean;
  addCartItem: (params: {
    token: string;
    cartItem: Omit<CartItem, "cartId">;
  }) => void;
}

export const useCartStore = create<State>((set) => ({
  data: undefined,
  isLoading: false,
  addCartItem: async ({ token, cartItem }) => {
    try {
      set({ isLoading: true });

      await fetch("http://localhost:5454/api/user/cart-item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      });
    } catch (e) {
      console.log(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
