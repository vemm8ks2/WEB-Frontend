import { create } from "zustand";

import type { Product } from "@/types/product";

export enum PaymentMethod {
  digitalWallet = "DIGITAL_WALLET",
  creditOrDebitCart = "CREDIT_OR_DEBIT_CARD",
  depositWithoutPassbook = "DEPOSIT_WITHOUT_PASSBOOK",
}

export interface ResponseOrderItem {
  id: number;
  quantity: number;
  size: string;
  price: number;
  cartId: number;
  product: Product;
}

export interface ResponseOrder {
  deliveredAt: Date;
  id: number;
  orderItems: ResponseOrderItem[];
  paymentMethod: PaymentMethod;
  receiverName?: string;
  receiverPhone?: string;
  shippingAddress: string;
  totalPrice: number;
}

interface ResponseData {
  message: string;
  data: ResponseOrder[];
}

interface State {
  orders: ResponseOrder[];
  isLoading: boolean;
  getOrderList: (params: { token: string }) => void;
  saveOrder: (params: {
    token: string;
    shippingAddress: string;
    receiverName?: string;
    receiverPhone?: string;
    paymentMethod: PaymentMethod;
    totalPrice: number;
  }) => Promise<{ message: string; statusCode: number }>;
}

export const useOrderStore = create<State>((set) => ({
  orders: [],
  isLoading: false,
  getOrderList: async ({ token }) => {
    set({ isLoading: true });

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/user/order/history`;

      const res = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: orders }: ResponseData = await res.json();

      set({ orders });
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });
  },
  saveOrder: async ({
    token,
    shippingAddress,
    receiverName,
    receiverPhone,
    paymentMethod,
    totalPrice,
  }) => {
    const result = { message: "", statusCode: -1 };

    set({ isLoading: true });

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/user/order`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress,
          receiverName,
          receiverPhone,
          paymentMethod,
          totalPrice,
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
