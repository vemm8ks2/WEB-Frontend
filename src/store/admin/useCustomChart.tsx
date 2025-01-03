import { create } from "zustand";

interface State {
  isLoading: boolean;
  hasError: boolean;
  getChart: (params: { token: string; arg: string }) => Promise<string>;
}

export const useCustomChartStore = create<State>((set) => ({
  isLoading: false,
  hasError: false,
  getChart: async ({ token, arg }) => {
    set({ isLoading: true });

    let result = "";

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/admin/chart`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(arg),
      });

      if (res.status === 200) {
        const html = await res.text();
        result = html;
      } else {
        set({ hasError: true });
      }
    } catch (e) {
      console.error(e);
      set({ hasError: true });
    }

    set({ isLoading: false });

    return result;
  },
}));
