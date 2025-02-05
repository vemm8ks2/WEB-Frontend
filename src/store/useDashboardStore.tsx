import { create } from "zustand";

import type { StoreApi, UseBoundStore } from "zustand";
import type { ResponseOrder } from "@/store/useOrderStore";
import type { ResponseUser } from "@/store/useAuthStore";

interface BaseState<T> {
  data?: { message: string; data?: T };
  isLoading: boolean;
  getData: (params: { token: string }) => void;
}

interface DashboardState {
  useTotalSalesOfThisMonth: UseBoundStore<StoreApi<BaseState<number | null>>>;
  useTotalSalesOfLastMonth: UseBoundStore<StoreApi<BaseState<number | null>>>;
  useSignupUsersOfThisMonth: UseBoundStore<StoreApi<BaseState<number>>>;
  useSignupUsersOfLastMonth: UseBoundStore<StoreApi<BaseState<number>>>;
  useOrdersNumberOfThisMonth: UseBoundStore<StoreApi<BaseState<number>>>;
  useOrdersNumberOfLastMonth: UseBoundStore<StoreApi<BaseState<number>>>;
  useOrderAmountForLastYear: UseBoundStore<
    StoreApi<BaseState<[number, number, number][]>>
  >;
  useTop5RecentOrders: UseBoundStore<
    StoreApi<BaseState<(ResponseOrder & { user: ResponseUser })[]>>
  >;
  useSellingQuantityForThisMonth: UseBoundStore<StoreApi<BaseState<number>>>;
  useSellingQuantityForLastMonth: UseBoundStore<StoreApi<BaseState<number>>>;
}

function createBaseStore<T>(url: string) {
  return create<BaseState<T>>((set) => ({
    data: undefined,
    isLoading: false,
    getData: async ({ token }) => {
      set({ isLoading: true });

      try {
        const endpoint = import.meta.env.VITE_API_URL + url;

        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        set({ data });
      } catch (e) {
        console.error(e);
      }

      set({ isLoading: false });
    },
  }));
}

const useTotalSalesOfThisMonth = createBaseStore<number | null>(
  "/admin/dashboard/total-sales-of-this-month"
);

const useTotalSalesOfLastMonth = createBaseStore<number | null>(
  "/admin/dashboard/total-sales-of-last-month"
);

const useSignupUsersOfThisMonth = createBaseStore<number>(
  "/admin/dashboard/signup-users-of-this-month"
);

const useSignupUsersOfLastMonth = createBaseStore<number>(
  "/admin/dashboard/signup-users-of-last-month"
);

const useOrdersNumberOfThisMonth = createBaseStore<number>(
  "/admin/dashboard/orders-number-of-this-month"
);

const useOrdersNumberOfLastMonth = createBaseStore<number>(
  "/admin/dashboard/orders-number-of-last-month"
);

const useOrderAmountForLastYear = createBaseStore<[number, number, number][]>(
  "/admin/dashboard/order-amount-for-last-year"
);

const useTop5RecentOrders = createBaseStore<
  (ResponseOrder & { user: ResponseUser })[]
>("/admin/dashboard/top5-recent-orders");

const useSellingQuantityForThisMonth = createBaseStore<number>(
  "/admin/dashboard/selling-quantity-for-this-month"
);

const useSellingQuantityForLastMonth = createBaseStore<number>(
  "/admin/dashboard/selling-quantity-for-last-month"
);

export const useDashboardStore = create<DashboardState>(() => ({
  useTotalSalesOfThisMonth: useTotalSalesOfThisMonth,
  useTotalSalesOfLastMonth: useTotalSalesOfLastMonth,
  useSignupUsersOfThisMonth: useSignupUsersOfThisMonth,
  useSignupUsersOfLastMonth: useSignupUsersOfLastMonth,
  useOrdersNumberOfThisMonth: useOrdersNumberOfThisMonth,
  useOrdersNumberOfLastMonth: useOrdersNumberOfLastMonth,
  useOrderAmountForLastYear: useOrderAmountForLastYear,
  useTop5RecentOrders: useTop5RecentOrders,
  useSellingQuantityForThisMonth: useSellingQuantityForThisMonth,
  useSellingQuantityForLastMonth: useSellingQuantityForLastMonth,
}));
