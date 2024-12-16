import { create } from "zustand";

export enum PaymentMethod {
  digitalWallet = "DIGITAL_WALLET",
  creditOrDebitCart = "CREDIT_OR_DEBIT_CARD",
  depositWithoutPassbook = "DEPOSIT_WITHOUT_PASSBOOK",
}

interface State {
  isLoading: boolean;
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
  isLoading: false,
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
      const res = await fetch("http://localhost:5454/api/user/order", {
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
