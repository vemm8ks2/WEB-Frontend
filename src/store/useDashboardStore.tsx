import { create } from "zustand";

import type { StoreApi, UseBoundStore } from "zustand";

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
  useOrderAmountByMonth: UseBoundStore<StoreApi<BaseState<unknown>>>;
  useTop5RecentOrders: UseBoundStore<StoreApi<BaseState<unknown>>>;
}

function createBaseStore<T>(url: string) {
  return create<BaseState<T>>((set) => ({
    data: undefined,
    isLoading: false,
    getData: async ({ token }) => {
      set({ isLoading: true });

      try {
        const res = await fetch(url, {
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
  "http://localhost:5454/api/admin/dashboard/total-sales-of-this-month"
);

const useTotalSalesOfLastMonth = createBaseStore<number | null>(
  "http://localhost:5454/api/admin/dashboard/total-sales-of-last-month"
);

const useSignupUsersOfThisMonth = createBaseStore<number>(
  "http://localhost:5454/api/admin/dashboard/signup-users-of-this-month"
);

const useSignupUsersOfLastMonth = createBaseStore<number>(
  "http://localhost:5454/api/admin/dashboard/signup-users-of-last-month"
);

const useOrdersNumberOfThisMonth = createBaseStore<number>(
  "http://localhost:5454/api/admin/dashboard/orders-number-of-this-month"
);

const useOrdersNumberOfLastMonth = createBaseStore<number>(
  "http://localhost:5454/api/admin/dashboard/orders-number-of-last-month"
);

const useOrderAmountByMonth = createBaseStore(
  "http://localhost:5454/api/admin/dashboard/order-amount-by-month"
);

const useTop5RecentOrders = createBaseStore(
  "http://localhost:5454/api/admin/dashboard/top5-recent-orders"
);

export const useDashboardStore = create<DashboardState>(() => ({
  useTotalSalesOfThisMonth: useTotalSalesOfThisMonth,
  useTotalSalesOfLastMonth: useTotalSalesOfLastMonth,
  useSignupUsersOfThisMonth: useSignupUsersOfThisMonth,
  useSignupUsersOfLastMonth: useSignupUsersOfLastMonth,
  useOrdersNumberOfThisMonth: useOrdersNumberOfThisMonth,
  useOrdersNumberOfLastMonth: useOrdersNumberOfLastMonth,
  useOrderAmountByMonth: useOrderAmountByMonth,
  useTop5RecentOrders: useTop5RecentOrders,
}));
